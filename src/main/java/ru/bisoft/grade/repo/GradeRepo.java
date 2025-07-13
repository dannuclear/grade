package ru.bisoft.grade.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

import ru.bisoft.grade.domain.Grade;

@Transactional(readOnly = true)
public interface GradeRepo extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {

}