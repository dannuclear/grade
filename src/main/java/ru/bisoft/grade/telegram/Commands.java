package ru.bisoft.grade.telegram;

/**
 * set_rates - Выставить оценки
 * get_rates - Вывести оценки за период
 * change_pin - Изменить пин-код
 * cancel - Отмена команды
 */
public class Commands {
    /**
     * Выставить оценки
     */
    public static final String SET_RATES = "/set_rates";
    /**
     * Просмотр оценок
     */
    public static final String GET_RATES = "/get_rates";

    /**
     * Изменить пин-код
     */
    public static final String CHANGE_PIN = "/change_pin";

    /**
     * Изменить пин-код
     */
    public static final String CANCEL = "/cancel";

    /**
     * Изменить пин-код
     */
    public static final String CANCEL_RU = "отмена";
}