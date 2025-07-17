package ru.bisoft.grade.telegram;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import ru.bisoft.grade.domain.Person;
import ru.bisoft.grade.domain.Teacher;
import ru.bisoft.grade.domain.User;

@Getter
@Setter
@RequiredArgsConstructor
public class UserSession {
    private final Long chatId;
    private final String userName;
    private ChatState state = ChatState.STARTED;
    private User dbUser;

    public static UserSession create(Long charId, String userName) {
        return new UserSession(charId, userName);
    }

    public boolean hasDbUser() {
        return dbUser != null;
    }

    public boolean isTeacher() {
        return hasDbUser() && dbUser.getTeacher() != null;
    }

    public boolean isStudent() {
        return hasDbUser() && dbUser.getStudent() != null;
    }

    public Teacher getTeacher() {
        return dbUser.getTeacher();
    }

    public Person getStudent() {
        return dbUser.getStudent();
    }
}
