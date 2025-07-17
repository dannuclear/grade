package ru.bisoft.grade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode;

import ru.bisoft.grade.telegram.BotConfigurationProperties;

@SpringBootApplication
// Анотация включает сериализацию обычного Page, возвращаемого репозиторием в стабильный PagedModel
@EnableSpringDataWebSupport(pageSerializationMode = PageSerializationMode.VIA_DTO)
@EnableConfigurationProperties(BotConfigurationProperties.class)
public class GradeApplication {

	public static void main(String[] args) {
		SpringApplication.run(GradeApplication.class, args);
	}

}
