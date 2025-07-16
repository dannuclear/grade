package ru.bisoft.grade.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import ru.bisoft.grade.domain.Subject;

@Transactional(readOnly = true)
public interface SubjectRepo extends JpaRepository<Subject, Integer> {
    Subject findByNameIgnoreCase(String name);
}
