package ru.bisoft.grade.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

import ru.bisoft.grade.domain.Teacher;

@Transactional(readOnly = true)
public interface TeacherRepo extends JpaRepository<Teacher, Integer>, JpaSpecificationExecutor<Teacher> {

}