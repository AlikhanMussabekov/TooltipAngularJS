package ru.cs.ifmo.angularjstooltip.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.cs.ifmo.angularjstooltip.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByFirstNameAndLastName(String firstName, String lastName);

}
