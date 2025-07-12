package ru.bisoft.grade.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import ru.bisoft.grade.domain.Teacher;
import ru.bisoft.grade.dto.TeacherDto;

@Mapper
public interface TeacherMapper {
    Teacher toTeacher(TeacherDto dto);

    TeacherDto toDto(Teacher Teacher);

    void updateTeacherFromDto(TeacherDto dto, @MappingTarget Teacher Teacher);
}
