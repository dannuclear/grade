
package ru.bisoft.grade.telegram;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

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
import ru.bisoft.grade.repo.GradeRepo;
import ru.bisoft.grade.repo.PersonRepo;
import ru.bisoft.grade.repo.SubjectRepo;
import ru.bisoft.grade.repo.TeacherRepo;
import ru.bisoft.grade.repo.UserRepository;

@Component
@RequiredArgsConstructor
class GradeLongPoolingBot implements SpringLongPollingBot, LongPollingSingleThreadUpdateConsumer {
    private static final String ESTIMATE = "/estimate";
    private static final String CHANGE_PIN = "/change_pin";

    private final BotConfigurationProperties properties;
    private final UserRepository userRepository;
    private final PersonRepo personRepository;
    private final SubjectRepo subjectRepository;
    private final GradeRepo gradeRepository;
    private final TeacherRepo teacherRepository;
    private final TelegramClient client;

    private final Map<String, ChatState> userState = new HashMap<>();
    private final Map<String, List<Grade>> grades = new HashMap<>();
    private final Map<String, Boolean> changePin = new HashMap<>();
    private final Map<Long, UserSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void consume(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            Message message = update.getMessage();
            final Long chatId = message.getChatId();
            final String userName = message.getFrom().getUserName();
            final String text = message.getText();
            UserSession session = sessions.computeIfAbsent(chatId, id -> UserSession.create(id, userName));
            Optional<ru.bisoft.grade.domain.User> optUser = userRepository.findByTgUsername(userName);
            if (optUser.isPresent())
                session.setDbUser(optUser.get());
            try {
                handleMessage(session, text);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }

        // Message message = update.getMessage();
        // User tgUser = message.getFrom();
        // Optional<ru.bisoft.grade.domain.User> optUser =
        // userRepository.findByTgUsername(tgUser.getUserName());
        // if (optUser.isPresent()) {
        // ru.bisoft.grade.domain.User dbUser = optUser.get();
        // switch (userState.getOrDefault(tgUser.getUserName(), ChatState.STARTED)) {
        // case STARTED:
        // sendTextMessage(message.getChatId(), "Добро пожаловать: " +
        // dbUser.getFullName());
        // if (dbUser.getTgPin() == null) {
        // sendTextMessage(message.getChatId(), "Для доступа к функциям придумайте
        // пин-код 4 цифры:");
        // userState.put(tgUser.getUserName(), ChatState.WAITING_FOR_PIN);
        // break;
        // }
        // toWaitingCommand(tgUser.getUserName(), message.getChatId());
        // break;
        // case WAITING_FOR_PIN:
        // String pin = message.getText();
        // deleteMessage(message.getChatId(), message.getMessageId());
        // if (!checkPin(pin, null)) {
        // sendTextMessage(message.getChatId(), "Некорректный пин-код (4 цифры)
        // попробуйте еще раз:");
        // break;
        // }
        // userRepository.updateTgPinById(dbUser.getId(), pin);
        // sendTextMessage(message.getChatId(), "Пин код успешно установлен");
        // toWaitingCommand(tgUser.getUserName(), message.getChatId());
        // break;
        // case WAITING_COMMAND:
        // if (ESTIMATE.equals(message.getText())) {
        // toWaitingEstimate(tgUser.getUserName(), message.getChatId());
        // break;
        // } else if (CHANGE_PIN.equals(message.getText())) {
        // changePin.put(tgUser.getUserName(), true);
        // toPinConfirmation(tgUser.getUserName(), message.getChatId());
        // break;
        // }
        // sendTextMessage(message.getChatId(), "Команда не распознана");
        // break;
        // case WAITING_FOR_ESTIMATE:
        // String estimateText = message.getText();
        // String[] estimateParts = estimateText.split(" ");
        // Person person = personRepository.findBySurnameIgnoreCase(estimateParts[0]);
        // if (person == null) {
        // sendTextMessage(message.getChatId(), "Нет такого учащегося");
        // toWaitingCommand(tgUser.getUserName(), message.getChatId());
        // break;
        // }
        // Subject subject = subjectRepository.findByNameIgnoreCase(estimateParts[1]);
        // if (subject == null) {
        // sendTextMessage(message.getChatId(), "Нет такого предмета");
        // toWaitingCommand(tgUser.getUserName(), message.getChatId());
        // break;
        // }
        // Teacher teacher = dbUser.getTeacher();
        // if (teacher == null) {
        // sendTextMessage(message.getChatId(), "Вы не преподаватель");
        // toWaitingCommand(tgUser.getUserName(), message.getChatId());
        // break;
        // }
        // Grade grade = new Grade();
        // grade.setCreatedAt(LocalDateTime.now());
        // grade.setDateTime(LocalDateTime.now());
        // grade.setCreatedBy(dbUser.getUsername());
        // grade.setStudent(person);
        // grade.setSubject(subject);
        // grade.setVal(Short.parseShort(estimateParts[2]));
        // grade.setTeacher(teacher);
        // grades.put(tgUser.getUserName(), List.of(grade));
        // toPinConfirmation(tgUser.getUserName(), message.getChatId());
        // break;
        // case PIN_CONFIRMATION:
        // String pinConfirmation = message.getText();
        // if (!checkPin(pinConfirmation, dbUser.getTgPin())) {
        // sendTextMessage(message.getChatId(), "Некорректный пин-код (4 цифры)
        // попробуйте еще раз:");
        // break;
        // }
        // deleteMessage(message.getChatId(), message.getMessageId());
        // if (grades.containsKey(tgUser.getUserName())) {
        // List<Grade> gradesForSave = grades.get(tgUser.getUserName());
        // gradeRepository.saveAll(gradesForSave);
        // grades.remove(tgUser.getUserName());
        // sendTextMessage(message.getChatId(), "Оценки успешно сохранены");
        // } else if (changePin.containsKey(tgUser.getUserName())) {
        // toChangePin(tgUser.getUserName(), message.getChatId());
        // break;
        // }

        // toWaitingCommand(tgUser.getUserName(), message.getChatId());
        // break;
        // default:
        // break;
        // }
        // }
    }

    private void handleMessage(UserSession session, String text) throws TelegramApiException {
        switch (session.getState()) {
            case STARTED:
                if (!session.isStudent() && !session.isTeacher()) {
                    sendTextWithStatus(session, ChatState.AWAIT_ASSOCIATION, Messages.NEED_ASSOCIATION);
                    return;
                }
                break;
            case AWAIT_ASSOCIATION:
                if (!text.matches("(?i)^[а-яё]+(?:-[а-яё]+)?\\s[а-яё]+\\s[а-яё]+$")) {
                    sendTextWithStatus(session, ChatState.AWAIT_ASSOCIATION, Messages.WRONG_FULL_NAME);
                    break;
                }
                Optional<ru.bisoft.grade.domain.User> optUser = userRepository.findByFullName(text);
                if (optUser.isPresent()) {
                    ru.bisoft.grade.domain.User user = optUser.get();
                    user.setTgUsername(session.getUserName());
                    userRepository.save(user);
                    sendTextWithStatus(session, ChatState.STARTED, Messages.SUCCESS_ASSOCIATION, user.getFullName());
                }
                break;
            default:
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

    private void toWaitingCommand(String username, Long chatId) {
        sendTextMessage(chatId, "Какое действие хотите сделать?");
        userState.put(username, ChatState.WAITING_COMMAND);
    }

    private void toWaitingEstimate(String username, Long chatId) {
        sendTextMessage(chatId, "Введите оценку в формате\nИванов Литература 5");
        userState.put(username, ChatState.WAITING_FOR_ESTIMATE);
    }

    private void toPinConfirmation(String username, Long chatId) {
        sendTextMessage(chatId, "Введите установленный пин:");
        userState.put(username, ChatState.PIN_CONFIRMATION);
    }

    private void toChangePin(String username, Long chatId) {
        sendTextMessage(chatId, "Введите новый пин:");
        userState.put(username, ChatState.WAITING_FOR_PIN);
    }

    private void sendTextMessage(Long chatId, String message) {
        SendMessage sm = SendMessage.builder().chatId(chatId).text(message).build();
        try {
            client.execute(sm);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void sendTextWithStatus(UserSession session, ChatState status, String message, Object... args)
            throws TelegramApiException {
        sendText(session.getChatId(), message, args);
        session.setState(status);
    }

    private void sendText(Long chatId, String message, Object... args) throws TelegramApiException {
        client.execute(SendMessage.builder().chatId(chatId).text(message.formatted(args)).build());
    }

    private void deleteMessage(Long chatId, Integer messageId) {
        DeleteMessage deleteMessage = DeleteMessage.builder().chatId(chatId).messageId(messageId).build();
        try {
            client.execute(deleteMessage);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private boolean checkPin(String pin, String checkedPin) {
        return pin != null && pin.matches("\\d{4}") && (checkedPin == null || checkedPin.equals(pin));
    }
}