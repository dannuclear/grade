package ru.bisoft.grade.swagger.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Target({ ElementType.METHOD, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Parameter(in = ParameterIn.QUERY
		, description = "Индекс страницы (0..N)"
		, name = "page"
		, schema = @Schema(type = "integer", defaultValue = "0"))
@Parameter(in = ParameterIn.QUERY
		, description = "Размер страницы"
		, name = "size"
		, schema = @Schema(type = "integer", defaultValue = "20"))
@Parameter(in = ParameterIn.QUERY
		, description = "Критерий сортировки (id,asc). "
		, name = "sort"
		, array = @ArraySchema(schema = @Schema(type = "string", defaultValue = "id,asc")))
@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Успешно")
})
public @interface PageableWithDefaultCodes {

}