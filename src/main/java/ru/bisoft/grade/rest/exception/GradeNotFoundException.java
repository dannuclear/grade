package ru.bisoft.grade.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class GradeNotFoundException extends RuntimeException {
    public GradeNotFoundException() {
        super("Оценка не найден");
    }
}
