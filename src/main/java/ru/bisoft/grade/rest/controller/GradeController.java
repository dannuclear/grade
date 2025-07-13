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
import ru.bisoft.grade.domain.Grade;
import ru.bisoft.grade.repo.GradeRepo;
import ru.bisoft.grade.rest.exception.GradeNotFoundException;
import ru.bisoft.grade.swagger.annotations.PageableWithDefaultCodes;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/grades")
public class GradeController {
    private final GradeRepo repo;

    @GetMapping
    @PageableWithDefaultCodes
    public Page<Grade> all(
            @Parameter(hidden = true) @SortDefault(value = "id") Pageable pageable,
            @RequestParam(required = false) String q) {
        return repo.findAll(pageable);
    }

    @GetMapping("{id:\\d+}")
    public Grade byId(@PathVariable Integer id) {
        return repo.findById(id).orElseThrow(GradeNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Grade add(@RequestBody Grade dto) {
        Grade grade = repo.save(dto);
        return grade;
    }

    @PutMapping("{id:\\d+}")
    public Grade update(@PathVariable Integer id, @RequestBody Grade dto) {
        Grade grade = repo.findById(id).orElseThrow(GradeNotFoundException::new);
        repo.save(grade);
        return dto;
    }
}