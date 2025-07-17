package ru.bisoft.grade.rest.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import ru.bisoft.grade.domain.Person;
import ru.bisoft.grade.domain.Teacher;
import ru.bisoft.grade.domain.User;
import ru.bisoft.grade.dto.PersonDto;
import ru.bisoft.grade.dto.TeacherDto;
import ru.bisoft.grade.dto.UserDto;
import ru.bisoft.grade.mapper.UserMapper;
import ru.bisoft.grade.repo.UserRepository;
import ru.bisoft.grade.rest.exception.UserNotFoundException;
import ru.bisoft.grade.swagger.annotations.DefaultFindById;
import ru.bisoft.grade.swagger.annotations.PageableWithDefaultCodes;

@Tag(name = "Ручка пользователей", description = "Обеспечивает работу с пользователями")
@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    @PageableWithDefaultCodes
    public Page<UserDto> all(
            @Parameter(hidden = true) @SortDefault(value = "id") Pageable pageable,
            @RequestParam(required = false) String q) {
        return userRepository.findAll(pageable).map(mapper::toDto);
    }

    @DefaultFindById
    @GetMapping("{id:\\d+}")
    public UserDto byId(@PathVariable Integer id) {
        UserDto dto = userRepository.findById(id).map(mapper::toDto).orElseThrow(UserNotFoundException::new);
        dto.setPassword(UserDto.PASSWORD_PLACEHOLDER);
        return dto;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto add(@RequestBody UserDto dto) {
        User user = userRepository.save(mapper.toUser(dto));
        return mapper.toDto(user);
    }

    @PutMapping("{id:\\d+}")
    public UserDto update(@PathVariable Integer id, @RequestBody UserDto dto) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        mapper.updateUserFromDto(dto, user);
        PersonDto student = dto.getStudent();
        TeacherDto teacher = dto.getTeacher();
        if (student != null)
            user.setStudent(new Person(student.getId()));
        else
            user.setStudent(null);
        if (teacher != null)
            user.setTeacher(new Teacher(teacher.getId()));
        else
            user.setTeacher(null);
        user = userRepository.save(user);
        if (dto.hasPassword() && user.getId() != null && !UserDto.PASSWORD_PLACEHOLDER.equals(dto.getPassword())) {
            String pwdHash = passwordEncoder.encode(dto.getPassword());
            userRepository.updatePasswordById(user.getId(), pwdHash);
        }
        return mapper.toDto(user);
    }
}