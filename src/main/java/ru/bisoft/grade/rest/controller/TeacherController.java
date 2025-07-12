package ru.bisoft.grade.rest.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
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
import lombok.RequiredArgsConstructor;
import ru.bisoft.grade.domain.Teacher;
import ru.bisoft.grade.dto.TeacherDto;
import ru.bisoft.grade.mapper.TeacherMapper;
import ru.bisoft.grade.repo.TeacherRepo;
import ru.bisoft.grade.rest.exception.TeacherNotFoundException;
import ru.bisoft.grade.swagger.annotations.PageableWithDefaultCodes;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/teachers")
public class TeacherController {
    private final TeacherRepo repo;
    private final TeacherMapper mapper;

    @GetMapping
    @PageableWithDefaultCodes
    public Page<TeacherDto> all(
            @Parameter(hidden = true) @SortDefault(value = "id") Pageable pageable,
            @RequestParam(required = false) String q) {
        return repo.findAll(pageable).map(mapper::toDto);
    }

    @GetMapping("{id:\\d+}")
    @ResponseStatus(HttpStatus.OK)
    public TeacherDto byId(@PathVariable Integer id) {
        return repo.findById(id).map(mapper::toDto).orElseThrow(TeacherNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeacherDto add(@RequestBody TeacherDto dto) {
        Teacher teacher = repo.save(mapper.toTeacher(dto));
        return mapper.toDto(teacher);
    }

    @PutMapping("{id:\\d+}")
    public TeacherDto update(@PathVariable Integer id, @RequestBody TeacherDto dto) {
        Teacher teacher = repo.findById(id).orElseThrow(TeacherNotFoundException::new);
        mapper.updateTeacherFromDto(dto, teacher);
        repo.save(teacher);
        return dto;
    }
}