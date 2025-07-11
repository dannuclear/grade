package ru.bisoft.grade.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import ru.bisoft.grade.domain.Group;

@Transactional(readOnly = true)
public interface GroupRepo extends JpaRepository<Group, Integer> {

}