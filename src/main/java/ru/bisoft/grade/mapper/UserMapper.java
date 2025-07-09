package ru.bisoft.grade.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import ru.bisoft.grade.domain.User;
import ru.bisoft.grade.dto.UserDto;

@Mapper
public interface UserMapper {
    User toUser(UserDto dto);

    UserDto toDto(User user);

    void updateUserFromDto(UserDto dto, @MappingTarget User user);
}
