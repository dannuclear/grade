package ru.bisoft.grade;

import org.springdoc.core.customizers.ParameterCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration(proxyBeanMethods = false)
public class SwaggerConfig {

    @Bean
    OpenAPI openAPI() {
        return new OpenAPI()
        .info(new Info().title("Электронный журнал API"));
    }

    @Bean
    ParameterCustomizer pageableParameterCustomizer() {
        return (parameterModel, methodParameter) -> {
            if (methodParameter.getParameterType().equals(Pageable.class)) {
                parameterModel.setRequired(false);
            }
            return parameterModel;
        };
    }
}
