package ru.bisoft.grade.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import ru.bisoft.grade.domain.Person;
import ru.bisoft.grade.dto.PersonDto;
import ru.bisoft.grade.dto.PersonFlat;

@Mapper
public interface PersonMapper {
    Person toPerson(PersonDto dto);

    PersonDto toDto(Person Person);

    @Mapping(target = "groupName", source = "group.name")
    PersonFlat toFlat(Person person);

    void updatePersonFromDto(PersonDto dto, @MappingTarget Person Person);
}
