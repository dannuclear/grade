package ru.bisoft.grade.repo.specs;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Expression;
import ru.bisoft.grade.domain.Person;

public class PersonSpec {
    public static Specification<Person> byGroupId(Integer id) {
        return (root, query, builder) -> builder.equal(root.get("group").get("id"), id);
    }

    public static Specification<Person> byExactFullName(String fullName) {
        return (root, query, builder) -> {
            if (fullName == null || fullName.trim().isEmpty()) {
                return builder.conjunction();
            }

            // Remove all spaces and convert to lowercase for comparison
            String processedName = fullName.replaceAll("\\s+", "").toLowerCase();

            // Concatenate firstname, surname, and patronymic (handling null patronymic)
            Expression<String> firstname = builder.lower(root.get("firstname"));
            Expression<String> surname = builder.lower(root.get("surname"));
            Expression<String> patronymic = builder.lower(root.get("patronymic"));

            // Handle possible null patronymic
            Expression<String> fullNameExpr = builder.concat(builder.concat(firstname, surname),
                    builder.coalesce(patronymic, ""));
            Expression<String> func = builder.function("replace", String.class, fullNameExpr, builder.literal(" "));
            return builder.equal(func, builder.literal(processedName));
        };
    }

    public static Specification<Person> byQ(String q) {
        return (root, query, builder) -> {
            if (q == null || q.trim().isEmpty()) {
                return builder.conjunction();
            }

            String likePattern = "%" + q.toLowerCase() + "%";

            return builder.or(
                    builder.like(builder.lower(root.get("firstname")), likePattern),
                    builder.like(builder.lower(root.get("surname")), likePattern),
                    builder.like(builder.lower(root.get("patronymic")), likePattern));
        };
    }
}
