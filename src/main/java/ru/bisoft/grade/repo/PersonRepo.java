package ru.bisoft.grade.repo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import ru.bisoft.grade.domain.Person;

@Transactional(readOnly = true)
public interface PersonRepo extends JpaRepository<Person, Integer> {

    @Override
    @EntityGraph(attributePaths = "group")
    Page<Person> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = "group")
    Optional<Person> findById(Integer id);

    Person findBySurnameIgnoreCase(String surname);
}