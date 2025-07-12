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
import ru.bisoft.grade.domain.Subject;
import ru.bisoft.grade.repo.SubjectRepo;
import ru.bisoft.grade.rest.exception.SubjectNotFoundException;
import ru.bisoft.grade.swagger.annotations.PageableWithDefaultCodes;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/subjects")
public class SubjectController {
    private final SubjectRepo repo;

    @GetMapping
    @PageableWithDefaultCodes
    public Page<Subject> all(
            @Parameter(hidden = true) @SortDefault(value = "id") Pageable pageable,
            @RequestParam(required = false) String q) {
        return repo.findAll(pageable);
    }

    @GetMapping("{id:\\d+}")
    public Subject byId(@PathVariable Integer id) {
        return repo.findById(id).orElseThrow(SubjectNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Subject add(@RequestBody Subject dto) {
        Subject subject = repo.save(dto);
        return subject;
    }

    @PutMapping("{id:\\d+}")
    public Subject update(@PathVariable Integer id, @RequestBody Subject dto) {
        Subject subject = repo.findById(id).orElseThrow(SubjectNotFoundException::new);
        repo.save(dto);
        return dto;
    }
}
