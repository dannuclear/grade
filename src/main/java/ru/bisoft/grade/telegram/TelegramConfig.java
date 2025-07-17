package ru.bisoft.grade.telegram;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.telegram.telegrambots.client.okhttp.OkHttpTelegramClient;
import org.telegram.telegrambots.meta.generics.TelegramClient;

@Configuration(proxyBeanMethods = false)
public class TelegramConfig {
    @Bean
    TelegramClient telegramClient(BotConfigurationProperties properties) {
        return new OkHttpTelegramClient(properties.getToken());
    }
}
