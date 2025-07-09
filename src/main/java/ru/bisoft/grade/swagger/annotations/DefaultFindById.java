package ru.bisoft.grade.swagger.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Target({ ElementType.METHOD, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Успешно"),
		@ApiResponse(responseCode = "404", description = "ресурс не найден", content = @Content(
			mediaType = "application/json", 
			examples = @ExampleObject(value = "{\"message\": \"Ресурс не найден\"}")))
})
public @interface DefaultFindById {

}