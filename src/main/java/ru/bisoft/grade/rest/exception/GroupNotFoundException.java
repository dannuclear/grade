package ru.bisoft.grade.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Класс не найден")
public class GroupNotFoundException extends RuntimeException {
    public GroupNotFoundException() {
        super("Класс не найден");
    }
}
