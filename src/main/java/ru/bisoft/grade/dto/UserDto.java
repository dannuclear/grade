package ru.bisoft.grade.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
        public static String PASSWORD_PLACEHOLDER = "******";

        private Integer id;
        private String username;
        private String firstname;
        private String surname;
        private String patronymic;
        private String password;
        private Boolean isActive;
        private String tgUsername;
        private String tgPin;
        private PersonDto student;
        private TeacherDto teacher;

        public boolean hasPassword() {
                return password != null && !password.isEmpty();
        }
}
