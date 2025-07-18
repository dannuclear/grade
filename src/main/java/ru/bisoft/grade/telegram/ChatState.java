package ru.bisoft.grade.telegram;

public enum ChatState {
    STARTED,
    WAITING_COMMAND,
    WAITING_FOR_PIN,
    WAITING_FOR_SET_RATES,
    WAITING_FOR_GET_RATES,
    PIN_CONFIRMATION,
    AWAIT_ASSOCIATION
}
