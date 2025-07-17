package ru.bisoft.grade.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import ru.bisoft.grade.domain.User;
import ru.bisoft.grade.dto.UserDto;

@Mapper
public interface UserMapper {
    User toUser(UserDto dto);

    @Mapping(target = "password", ignore = true)
    UserDto toDto(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "student", ignore = true)
    @Mapping(target = "teacher", ignore = true)
    void updateUserFromDto(UserDto dto, @MappingTarget User user);
}