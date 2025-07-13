package ru.bisoft.grade.repo.specs;

import java.util.Collection;

import org.springframework.data.jpa.domain.Specification;

import ru.bisoft.grade.domain.Grade;
import ru.bisoft.grade.domain.Person;
import ru.bisoft.grade.domain.Subject;
import ru.bisoft.grade.domain.Teacher;

public class GradeSpec {
    Specification<Grade> byTeacher(Teacher teacher) {
        return (root, query, builder) -> builder.equal(root.get("teacher"), teacher);
    }

    Specification<Grade> byStudent(Person student) {
        return (root, query, builder) -> builder.equal(root.get("student"), student);
    }

    Specification<Grade> bySubject(Subject subject) {
        return (root, query, builder) -> builder.equal(root.get("subject"), subject);
    }

    Specification<Grade> byAnyTeacher(Collection<Teacher> teachers) {
        return (root, query, builder) -> root.get("teacher").in(teachers);
    }

    Specification<Grade> byAnyStudent(Collection<Person> students) {
        return (root, query, builder) -> root.get("student").in(students);
    }

    Specification<Grade> byAnySubject(Collection<Subject> subjects) {
        return (root, query, builder) -> root.get("subject").in(subjects);
    }

    Specification<Grade> byAnyTeacherIds(Collection<Integer> teacherIds) {
        return (root, query, builder) -> root.get("teacher").get("id").in(teacherIds);
    }

    Specification<Grade> byAnyStudentIds(Collection<Integer> studentIds) {
        return (root, query, builder) -> root.get("student").get("id").in(studentIds);
    }

    Specification<Grade> byAnySubjectIds(Collection<Integer> subjectIds) {
        return (root, query, builder) -> root.get("subject").get("id").in(subjectIds);
    }
}
