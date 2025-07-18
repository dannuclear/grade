
package ru.bisoft.grade.telegram;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.longpolling.interfaces.LongPollingUpdateConsumer;
import org.telegram.telegrambots.longpolling.starter.SpringLongPollingBot;
import org.telegram.telegrambots.longpolling.util.LongPollingSingleThreadUpdateConsumer;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.DeleteMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.message.Message;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.meta.generics.TelegramClient;

import lombok.RequiredArgsConstructor;
import ru.bisoft.grade.domain.Grade;
import ru.bisoft.grade.domain.Person;
import ru.bisoft.grade.domain.Subject;
import ru.bisoft.grade.domain.Teacher;
import ru.bisoft.grade.repo.GradeRepo;
import ru.bisoft.grade.repo.PersonRepo;
import ru.bisoft.grade.repo.SubjectRepo;
import ru.bisoft.grade.repo.UserRepository;
import ru.bisoft.grade.repo.specs.GradeSpec;

@Component
@RequiredArgsConstructor
class GradeLongPoolingBot implements SpringLongPollingBot, LongPollingSingleThreadUpdateConsumer {
    private final BotConfigurationProperties properties;
    private final UserRepository userRepository;
    private final PersonRepo personRepository;
    private final SubjectRepo subjectRepository;
    private final GradeRepo gradeRepository;
    private final TelegramClient client;

    private final Map<Long, UserSession> sessions = new ConcurrentHashMap<>();
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");

    @Override
    public void consume(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            Message message = update.getMessage();
            final Long chatId = message.getChatId();
            final String userName = message.getFrom().getUserName();
            UserSession session = sessions.computeIfAbsent(chatId, id -> UserSession.create(id, userName));
            Optional<ru.bisoft.grade.domain.User> optUser = userRepository.findByTgUsername(userName);
            if (optUser.isPresent())
                session.setDbUser(optUser.get());
            try {
                handleMessage(session, message);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }

    private void handleMessage(UserSession session, Message message) throws TelegramApiException {
        String text = message.getText();
        switch (session.getState()) {
            case STARTED:
                // Если нет ассоциации с пользователем, требуем
                if (!session.isStudent() && !session.isTeacher()) {
                    sendTextWithStatus(session, ChatState.AWAIT_ASSOCIATION, Messages.ASSOCIATION_REQUIRED);
                    return;
                } else if (session.isTeacher()) { // Если это учитель
                    ru.bisoft.grade.domain.User dbUser = session.getDbUser();
                    // Требуем установить пин - код
                    if (dbUser.getTgPin() == null) {
                        sendTextWithStatus(session, ChatState.WAITING_FOR_PIN, Messages.PIN_REQUIRED);
                        break;
                    }
                    sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.GREETING_COMMAND,
                            dbUser.getFullName());
                    break;
                }
                break;
            case AWAIT_ASSOCIATION:
                if (!text.matches("^[А-ЯЁа-яё]+\\s+[А-ЯЁа-яё]+\\s+[А-ЯЁа-яё]+$")) {
                    sendTextWithStatus(session, ChatState.AWAIT_ASSOCIATION, Messages.WRONG_FULL_NAME);
                    break;
                }
                Optional<ru.bisoft.grade.domain.User> optUser = userRepository.findByFullName(text);
                if (optUser.isPresent()) {
                    ru.bisoft.grade.domain.User user = optUser.get();
                    if (user.getTgUsername() != null) {
                        sendTextWithStatus(session, ChatState.AWAIT_ASSOCIATION, Messages.ASSOCIATION_FAILED);
                        break;
                    }
                    user.setTgUsername(session.getUserName());
                    userRepository.save(user);
                    session.setDbUser(user);
                    sendTextWithStatus(session, ChatState.STARTED, Messages.ASSOCIATION_COMPLETE, user.getFullName());
                    handleMessage(session, message);
                    break;
                }
                sendTextWithStatus(session, ChatState.AWAIT_ASSOCIATION, Messages.ASSOCIATION_FAILED);
                break;
            case WAITING_FOR_PIN:
                deleteMessage(session.getChatId(), message.getMessageId());
                if (!checkPin(text, null)) {
                    sendTextWithStatus(session, ChatState.WAITING_FOR_PIN, Messages.PIN_FORMAT_INVALID);
                    break;
                }
                ru.bisoft.grade.domain.User user = session.getDbUser();
                user.setTgPin(text);
                userRepository.save(user);
                sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.PIN_FORMAT_VALID);
                break;
            case WAITING_COMMAND:
                if (Commands.SET_RATES.equals(text)) {
                    sendTextWithStatus(session, ChatState.WAITING_FOR_SET_RATES, Messages.SET_RATES_NOTIFICATION);
                    break;
                } else if (Commands.GET_RATES.equals(text)) {
                    sendTextWithStatus(session, ChatState.WAITING_FOR_GET_RATES, Messages.GET_RATES_NOTIFICATION);
                    break;
                } else if (Commands.CHANGE_PIN.equals(text)) {
                    session.setChangePin(true);
                    sendTextWithStatus(session, ChatState.PIN_CONFIRMATION, Messages.PIN_CHANGE);
                    break;
                }
                sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.UNSUPORTED_COMMAND);
                break;
            case WAITING_FOR_SET_RATES:
                if (!session.isTeacher()) {
                    sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.TEACHER_CHECK_FAILURE);
                    break;
                }
                if (isCancel(text)) {
                    sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.CANCEL);
                    break;
                }
                Teacher teacher = session.getTeacher();
                String[] rateParts = text.split(" ");
                Person person = personRepository.findBySurnameIgnoreCase(rateParts[0]);
                if (person == null) {
                    sendTextWithStatus(session, ChatState.WAITING_FOR_SET_RATES, Messages.STUDENT_NOT_FOUND,
                            rateParts[0]);
                    break;
                }
                Subject subject = subjectRepository.findByNameIgnoreCase(rateParts[1]);
                if (subject == null) {
                    sendTextWithStatus(session, ChatState.WAITING_FOR_SET_RATES, Messages.SUBJECT_NOT_FOUND,
                            rateParts[1]);
                    break;
                }
                Short rate = Short.parseShort(rateParts[2]);
                if (rate < 1 || rate > 5) {
                    sendTextWithStatus(session, ChatState.WAITING_FOR_SET_RATES, Messages.RATE_INVALID_FORMAT,
                            rateParts[2]);
                    break;
                }
                LocalDateTime now = LocalDateTime.now();

                Grade grade = Grade.builder()
                        .createdAt(now)
                        .dateTime(now)
                        .student(person)
                        .teacher(teacher)
                        .subject(subject)
                        .val(rate).build();
                session.getPreparedGrades().add(grade);
                String rateString = session.getPreparedGrades().stream().map(g -> {
                    return String.format("%s %s %s", g.getStudent().getFullName(), g.getSubject().getName(),
                            g.getVal());
                }).collect(Collectors.joining("\n"));
                sendTextWithStatus(session, ChatState.PIN_CONFIRMATION, Messages.RATE_CONFIRMATION, rateString);
                break;
            case WAITING_FOR_GET_RATES:
                if (session.isTeacher()) {
                    LocalDate endDate = LocalDate.now();
                    LocalDate startDate = endDate;
                    if ("Вчера".equalsIgnoreCase(text))
                        startDate = endDate.minusDays(1);
                    else if ("Неделя".equalsIgnoreCase(text))
                        startDate = endDate.minusWeeks(1);
                    else if ("Месяц".equalsIgnoreCase(text))
                        startDate = endDate.minusMonths(1);
                    else if ("Год".equalsIgnoreCase(text))
                        startDate = endDate.minusYears(1);
                    Specification<Grade> teacherSpec = GradeSpec.byTeacher(session.getTeacher());
                    Specification<Grade> periodSpec = GradeSpec.byPeriod(startDate, endDate.plusDays(1));
                    List<Grade> grades = gradeRepository.findAll(Specification.allOf(teacherSpec, periodSpec));
                    String rateString2 = grades.stream().map(this::gradeFormatByTeacher)
                            .collect(Collectors.joining("\n"));
                    sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.GET_RATES_RESULT,
                            session.getTeacher().getFullName(), rateString2);
                    break;
                }
            case PIN_CONFIRMATION:
                if (isCancel(text)) {
                    sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.CANCEL);
                    session.getPreparedGrades().clear();
                    break;
                }
                deleteMessage(message.getChatId(), message.getMessageId());
                if (!checkPin(text, session.getDbUser().getTgPin()) || session.getDbUser().getTgPin() == null) {
                    sendTextWithStatus(session, ChatState.PIN_CONFIRMATION, Messages.PIN_INCORRECT);
                    break;
                }
                if (!CollectionUtils.isEmpty(session.getPreparedGrades())) {
                    gradeRepository.saveAll(session.getPreparedGrades());
                    session.getPreparedGrades().clear();
                    sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.SET_RATES_SUCCESS);
                }
                if (session.getChangePin()) {
                    sendTextWithStatus(session, ChatState.WAITING_FOR_PIN, Messages.PIN_REQUIRED);
                    session.setChangePin(false);
                    break;
                }
                break;
            default:
                sendTextWithStatus(session, ChatState.WAITING_COMMAND, Messages.UNSUPORTED_STATE);
                break;
        }
    }

    @Override
    public String getBotToken() {
        return properties.getToken();
    }

    @Override
    public LongPollingUpdateConsumer getUpdatesConsumer() {
        return this;
    }

    private void sendTextWithStatus(UserSession session, ChatState status, String message, Object... args)
            throws TelegramApiException {
        sendText(session.getChatId(), message, args);
        session.setState(status);
    }

    private void sendText(Long chatId, String message, Object... args) throws TelegramApiException {
        client.execute(SendMessage.builder().chatId(chatId).text(message.formatted(args)).build());
    }

    private void deleteMessage(Long chatId, Integer messageId) throws TelegramApiException {
        client.execute(DeleteMessage.builder().chatId(chatId).messageId(messageId).build());
    }

    private boolean checkPin(String pin, String checkedPin) {
        return pin != null && pin.matches("\\d{4}") && (checkedPin == null || checkedPin.equals(pin));
    }

    private boolean isCancel(String text) {
        return Commands.CANCEL.equalsIgnoreCase(text) || Commands.CANCEL_RU.equalsIgnoreCase(text);
    }

    private String gradeFormatByTeacher(Grade grade) {
        return String.format("%s %s %s %s", grade.getDateTime().format(formatter), grade.getStudent().getFullName(),
                grade.getSubject().getName(), grade.getVal());
    }
}