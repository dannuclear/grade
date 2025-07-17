package ru.bisoft.grade.domain;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "auth_user")
public class User implements UserDetails {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    private String password;

    private String firstname;
    private String surname;
    private String patronymic;

    private Boolean isActive;
    private String roles;
    private String tgUsername;
    private String tgPin;

    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person student;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptySet();
    }

    @Override
    public boolean isEnabled() {
        return this.isActive;
    }

    public String getFullName() {
        if (teacher != null) {
            return String.format("%s %s %s", teacher.getSurname(), teacher.getFirstname(), teacher.getPatronymic())
                    .replaceAll("null", "")
                    .trim();
        } else if (student != null) {
            return String.format("%s %s %s", student.getSurname(), student.getFirstname(), student.getPatronymic())
                    .replaceAll("null", "")
                    .trim();
        }
        return String.format("%s %s %s", surname, firstname, patronymic).replaceAll("null", "").trim();
    }
}