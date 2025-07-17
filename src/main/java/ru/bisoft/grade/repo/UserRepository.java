package ru.bisoft.grade.repo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @EntityGraph(attributePaths = { "student.group", "teacher" })
    Optional<User> findByTgUsername(String username);

    @EntityGraph(attributePaths = { "student.group", "teacher" })
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(CONCAT(u.firstname, u.surname, COALESCE(u.patronymic, ''))) = " +
           "LOWER(REPLACE(?1, ' ', ''))")
    Optional<User> findByFullName(String fullName);
}
