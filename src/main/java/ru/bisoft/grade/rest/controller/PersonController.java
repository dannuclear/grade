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
import ru.bisoft.grade.domain.Person;
import ru.bisoft.grade.dto.PersonDto;
import ru.bisoft.grade.dto.PersonFlat;
import ru.bisoft.grade.mapper.PersonMapper;
import ru.bisoft.grade.repo.PersonRepo;
import ru.bisoft.grade.repo.specs.PersonSpec;
import ru.bisoft.grade.rest.exception.PersonNotFoundException;
import ru.bisoft.grade.swagger.annotations.PageableWithDefaultCodes;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/persons")
public class PersonController {
    private final PersonRepo repo;
    private final PersonMapper mapper;

    @GetMapping
    @PageableWithDefaultCodes
    public Page<PersonFlat> all(
            @Parameter(hidden = true) @SortDefault(value = "id") Pageable pageable,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer group) {

        List<Specification<Person>> specs = new ArrayList<>();
        if (q != null)
            specs.add(PersonSpec.byQ(q));
        if (group != null)
            specs.add(PersonSpec.byGroupId(group));
        return repo.findAll(Specification.allOf(specs), pageable).map(mapper::toFlat);
    }

    @GetMapping("{id:\\d+}")
    public PersonDto byId(@PathVariable Integer id) {
        return repo.findById(id).map(mapper::toDto).orElseThrow(PersonNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PersonDto add(@RequestBody PersonDto dto) {
        Person person = repo.save(mapper.toPerson(dto));
        return mapper.toDto(person);
    }

    @PutMapping("{id:\\d+}")
    public PersonDto update(@PathVariable Integer id, @RequestBody PersonDto dto) {
        Person person = repo.findById(id).orElseThrow(PersonNotFoundException::new);
        mapper.updatePersonFromDto(dto, person);
        repo.save(person);
        return dto;
    }
}