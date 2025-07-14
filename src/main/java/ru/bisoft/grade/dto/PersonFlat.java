package ru.bisoft.grade.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonFlat {
    private Integer id;
    private String firstname;
    private String surname;
    private String patronymic;
    private LocalDate birthday;
    private String groupName;
}
