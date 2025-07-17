package ru.bisoft.grade.telegram;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "telegram.bot")
public class BotConfigurationProperties {
    private final String token;
    private final String username;
}
