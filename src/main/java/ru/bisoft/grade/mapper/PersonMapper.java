package ru.bisoft.grade.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import ru.bisoft.grade.domain.Person;
import ru.bisoft.grade.dto.PersonDto;

@Mapper
public interface PersonMapper {
    Person toPerson(PersonDto dto);

    PersonDto toDto(Person Person);

    void updatePersonFromDto(PersonDto dto, @MappingTarget Person Person);
}
