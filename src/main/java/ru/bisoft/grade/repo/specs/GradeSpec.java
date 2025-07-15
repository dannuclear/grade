package ru.bisoft.grade.repo.specs;

import java.util.Collection;

import org.springframework.data.jpa.domain.Specification;

import ru.bisoft.grade.domain.Grade;
import ru.bisoft.grade.domain.Group;
import ru.bisoft.grade.domain.Person;
import ru.bisoft.grade.domain.Subject;
import ru.bisoft.grade.domain.Teacher;

public class GradeSpec {
    public static Specification<Grade> byTeacher(Teacher teacher) {
        return (root, query, builder) -> builder.equal(root.get("teacher"), teacher);
    }

    public static Specification<Grade> byStudent(Person student) {
        return (root, query, builder) -> builder.equal(root.get("student"), student);
    }

    public static Specification<Grade> bySubject(Subject subject) {
        return (root, query, builder) -> builder.equal(root.get("subject"), subject);
    }

    public static Specification<Grade> byGroup(Group group) {
        return (root, query, builder) -> builder.equal(root.get("student").get("group"), group);
    }

    public static Specification<Grade> byTeacherId(Integer id) {
        return (root, query, builder) -> builder.equal(root.get("teacher").get("id"), id);
    }

    public static Specification<Grade> byStudentId(Integer id) {
        return (root, query, builder) -> builder.equal(root.get("student").get("id"), id);
    }

    public static Specification<Grade> bySubjectId(Integer id) {
        return (root, query, builder) -> builder.equal(root.get("subject").get("id"), id);
    }

    public static Specification<Grade> byGroupId(Integer id) {
        return (root, query, builder) -> builder.equal(root.get("student").get("group").get("id"), id);
    }

    public static Specification<Grade> byAnyTeacher(Collection<Teacher> teachers) {
        return (root, query, builder) -> root.get("teacher").in(teachers);
    }

    public static Specification<Grade> byAnyStudent(Collection<Person> students) {
        return (root, query, builder) -> root.get("student").in(students);
    }

    public static Specification<Grade> byAnySubject(Collection<Subject> subjects) {
        return (root, query, builder) -> root.get("subject").in(subjects);
    }

    public static Specification<Grade> byAnyTeacherIds(Collection<Integer> teacherIds) {
        return (root, query, builder) -> root.get("teacher").get("id").in(teacherIds);
    }

    public static Specification<Grade> byAnyStudentIds(Collection<Integer> studentIds) {
        return (root, query, builder) -> root.get("student").get("id").in(studentIds);
    }

    public static Specification<Grade> byAnySubjectIds(Collection<Integer> subjectIds) {
        return (root, query, builder) -> root.get("subject").get("id").in(subjectIds);
    }
}
