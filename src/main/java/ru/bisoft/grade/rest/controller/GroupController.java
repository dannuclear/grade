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
import ru.bisoft.grade.domain.Group;
import ru.bisoft.grade.repo.GroupRepo;
import ru.bisoft.grade.rest.exception.GroupNotFoundException;
import ru.bisoft.grade.swagger.annotations.PageableWithDefaultCodes;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/groups")
public class GroupController {
    private final GroupRepo repo;

    @GetMapping
    @PageableWithDefaultCodes
    public Page<Group> all(
            @Parameter(hidden = true) @SortDefault(value = "id") Pageable pageable,
            @RequestParam(required = false) String q) {
        return repo.findAll(pageable);
    }

    @GetMapping("{id:\\d+}")
    public Group byId(@PathVariable Integer id) {
        return repo.findById(id).orElseThrow(GroupNotFoundException::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Group add(@RequestBody Group dto) {
        Group group = repo.save(dto);
        return group;
    }

    @PutMapping("{id:\\d+}")
    public Group update(@PathVariable Integer id, @RequestBody Group dto) {
        repo.findById(id).orElseThrow(GroupNotFoundException::new);
        Group group = repo.save(dto);
        return group;
    }
}