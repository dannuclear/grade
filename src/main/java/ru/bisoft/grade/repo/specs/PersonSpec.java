package ru.bisoft.grade.repo.specs;

import org.springframework.data.jpa.domain.Specification;

import ru.bisoft.grade.domain.Person;

public class PersonSpec {
    public static Specification<Person> byGroupId(Integer id) {
        return (root, query, builder) -> builder.equal(root.get("group").get("id"), id);
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
