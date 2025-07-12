package ru.bisoft.grade.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Учитель не найден")
public class TeacherNotFoundException extends RuntimeException {
    public TeacherNotFoundException() {
        super("Учитель не найден");
    }
}
