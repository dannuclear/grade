package ru.bisoft.grade.rest.controller;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ru.bisoft.grade.dto.StatsGradeDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/stats")
public class StatsController {
    private final JdbcTemplate template;

    String sql = "SELECT val as label, COUNT(*) as val FROM grade GROUP BY val";

    @GetMapping("/grades")
    public List<StatsGradeDto> grades() {
        List<StatsGradeDto> result = template.query(sql, (rs, rowNum) -> new StatsGradeDto(
                rs.getInt("val"),
                rs.getString("label")));
        return result;
    }

}
