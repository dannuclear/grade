package ru.bisoft.grade.repo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import ru.bisoft.grade.domain.User;

@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Integer> {
    @Override
    @EntityGraph(attributePaths = { "student.group", "teacher" })
    Page<User> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = { "student.group", "teacher" })
    Optional<User> findById(Integer id);

    User findByUsername(String username);

    @Modifying
    @Transactional(readOnly = false)
    @Query("UPDATE User u SET u.password = ?2 WHERE u.id = ?1")
    void updatePasswordById(Integer id, String pwdHash);

    @Modifying
    @Transactional(readOnly = false)
    @Query("UPDATE User u SET u.tgPin = ?2 WHERE u.id = ?1")
    void updateTgPinById(Integer id, String pin);

    Optional<User> findByTgUsername(String username);
}
