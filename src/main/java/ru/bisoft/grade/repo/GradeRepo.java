package ru.bisoft.grade.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

import ru.bisoft.grade.domain.Grade;

@Transactional(readOnly = true)
public interface GradeRepo extends JpaRepository<Grade, Integer>, JpaSpecificationExecutor<Grade> {
    @Override
    @EntityGraph(attributePaths = { "teacher", "student.group", "subject" })
    List<Grade> findAll(Specification<Grade> spec);

    @Override
    @EntityGraph(attributePaths = { "teacher", "student.group", "subject" })
    Page<Grade> findAll(Specification<Grade> spec, Pageable pageable);
}