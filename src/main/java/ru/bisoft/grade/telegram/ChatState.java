package ru.bisoft.grade.telegram;

public enum ChatState {
    STARTED,
    WAITING_COMMAND,
    WAITING_FOR_PIN,
    WAITING_FOR_ESTIMATE,
    PIN_CONFIRMATION,
    AWAIT_ASSOCIATION
}
