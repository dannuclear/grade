package ru.bisoft.grade.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstname;
    private String surname;
    private String patronymic;
    private LocalDate birthday;

    private String phoneNumber;
    private String email;

    public Teacher(Integer id) {
        this.id = id;
    }

    public String getFullName() {
        return (((surname != null ? surname : "") + " " + (firstname != null ? firstname : "") + " "
                + (patronymic != null ? patronymic : ""))).trim();
    }
}
