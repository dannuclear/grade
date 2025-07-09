package ru.bisoft.grade.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import ru.bisoft.grade.domain.Person;

@Transactional(readOnly = true)
public interface PersonRepo extends JpaRepository<Person, Integer> {

}