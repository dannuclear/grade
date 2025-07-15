package ru.bisoft.grade.rest.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
import ru.bisoft.grade.repo.specs.GradeSpec;
import ru.bisoft.grade.rest.exception.GradeNotFoundException;
import ru.bisoft.grade.swagger.annotations.PageableWithDefaultCodes;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/grades")
public class GradeController {
    private final GradeRepo repo;

    @GetMapping
    public List<Grade> all(
            @Parameter(hidden = true) @SortDefault(value = "id") Pageable pageable,
            @RequestParam(required = false) Integer studentId,
            @RequestParam(required = false) Integer groupId,
            @RequestParam(required = false) Integer subjectId,
            @RequestParam(required = false) Integer teacherId) {
        List<Specification<Grade>> specs = new ArrayList<>();
        if (studentId != null)
            specs.add(GradeSpec.byStudentId(studentId));
        if (groupId != null)
            specs.add(GradeSpec.byGroupId(groupId));
        if (subjectId != null)
            specs.add(GradeSpec.bySubjectId(subjectId));
        if (teacherId != null)
            specs.add(GradeSpec.byTeacherId(teacherId));
        return repo.findAll(Specification.allOf(specs));
    }

    @GetMapping("/student/{studentId}")
    @PageableWithDefaultCodes
    public Page<Grade> byStudent(
            @PathVariable Integer studentId,
            @Parameter(hidden = true) @SortDefault(value = "id") Pageable pageable) {
        return repo.findAll(GradeSpec.byStudentId(studentId), pageable);
    }

    @GetMapping("/student/{studentId}/subject/{subjectId}")
    @PageableWithDefaultCodes
    public Page<Grade> byStudentAndSubject(
            @PathVariable Integer studentId,
            @PathVariable Integer subjectId,
            Pageable pageable) {
        return repo.findAll(Specification.allOf(GradeSpec.byStudentId(studentId), GradeSpec.bySubjectId(subjectId)),
                pageable);
    }

    @GetMapping("/teacher/{teacherId}")
    @PageableWithDefaultCodes
    public Page<Grade> byTeacher(@PathVariable Integer teacherId, Pageable pageable) {
        return repo.findAll(GradeSpec.byTeacherId(teacherId), pageable);
    }

    @GetMapping("/teacher/{teacherId}/subject/{subjectId}")
    @PageableWithDefaultCodes
    public Page<Grade> byTeacherAndSubject(
            @PathVariable Integer teacherId,
            @PathVariable Integer subjectId,
            Pageable pageable) {
        return repo.findAll(Specification.allOf(GradeSpec.byTeacherId(teacherId), GradeSpec.bySubjectId(subjectId)),
                pageable);
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