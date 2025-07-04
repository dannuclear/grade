package ru.bisoft.grade.rest.controller;

import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import ru.bisoft.grade.domain.User;
import ru.bisoft.grade.repo.UserRepository;

@Tag(name = "Ручка пользователей", description = "Обеспечивает работу с пользователями")
@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @Tag(name = "Запрос всех пользователй", description = "Постраничное извлечение пользователей")

    @GetMapping
    @PageableAsQueryParam
    public Page<User> all(@SortDefault(value = "id") Pageable pageable) {
        return userRepository.findAll(pageable);
    }
}