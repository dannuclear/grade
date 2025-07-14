package ru.bisoft.grade.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.bisoft.grade.domain.Grade;
import ru.bisoft.grade.domain.Person;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GradeCross {
    private Set<LocalDate> dates;
    private List<Row> rows;

    public static GradeCross empty() {
        return new GradeCross(Collections.emptySet(), Collections.emptyList());
    }

    public static GradeCross build(List<Grade> grades) {
        if (CollectionUtils.isEmpty(grades))
            return empty();
        Set<LocalDate> dates = grades.stream()
                .map(Grade::getDateTime)
                .map(LocalDateTime::toLocalDate)
                .sorted()
                .collect(Collectors.toCollection(TreeSet::new));

        List<Row> rows = grades.stream()
                .collect(Collectors.groupingBy(Grade::getStudent,
                        Collectors.groupingBy(grade -> grade.getDateTime().toLocalDate())))
                .entrySet().stream().map(e -> Row.build(e.getKey(), e.getValue())).toList();

        return new GradeCross(dates, rows);
    }

    @Getter
    @Setter
    @AllArgsConstructor
    private static class Row {
        private Person student;
        private Map<LocalDate, List<Grade>> grades;

        public static Row build(Person student, Map<LocalDate, List<Grade>> grades) {
            return new Row(student, grades);
        }
    }
}
