package ru.bisoft.grade.telegram;

public class Messages {
    public static final String ASSOCIATION_REQUIRED = "Вы не зарегистрированы в системе. Введите полностью ФИО и мы ассоциируем Вас, если Вы есть в системе";
    public static final String ASSOCIATION_COMPLETE = "Пользователь [%s] найден, ассоциируем с пользователем";
    public static final String ASSOCIATION_FAILED = "Пользователь не найден, попробуйте еще раз";
    public static final String ASSOCIATION_ALREDY_EXISTS = "Пользователь уже ассоциирован с другим telegram - аккаунтом, обратитесь к администратору";

    public static final String WRONG_FULL_NAME = "Некорректно указано ФИО. укажите полностью. Можно строчными символами";
    public static final String PIN_REQUIRED = "Для доступа к функциям придумайте пин - код (4 цифры)";
    public static final String GREETING_COMMAND = "Добро пожаловать %s какое действие планируете выполнить?";
    public static final String PIN_FORMAT_INVALID = "Пин код должен содержать 4 цифры";
    public static final String PIN_FORMAT_VALID = "Пин код установлен";
    public static final String PIN_INCORRECT = "Неправильный пин-код";
    public static final String PIN_CHANGE = "Введите установленный пин-код";
    public static final String CANCEL = "Отмена";
    public static final String UNSUPORTED_COMMAND = "Неподдерживаемая команда";
    public static final String UNSUPORTED_STATE = "Неопределенное состояние";

    public static final String SET_RATES_NOTIFICATION = "Введите оценки в формате\nИнванов Математика 5 или слово \"отмена\"";
    public static final String GET_RATES_NOTIFICATION = "Введите опции: сегодня, вчера, неделя, месяц, год";
    public static final String GET_RATES_RESULT = "Оценки по [%s]:\n%s";
    public static final String SET_RATES_SUCCESS = "Оценки успешно сохранены";

    public static final String STUDENT_NOT_FOUND = "Учащийся [%s] не найден";
    public static final String SUBJECT_NOT_FOUND = "Предмет [%s] не найден";

    public static final String TEACHER_CHECK_FAILURE = "Вы не преподаватель!";
    public static final String RATE_INVALID_FORMAT = "Некорректная оценка [%s]";
    public static final String RATE_CONFIRMATION = "Введенные оценки:\n%s\nПодтвердите пин - кодом или введите \"отмена\"";
}
