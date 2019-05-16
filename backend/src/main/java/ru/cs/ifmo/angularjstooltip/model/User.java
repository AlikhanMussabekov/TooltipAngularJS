package ru.cs.ifmo.angularjstooltip.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_list")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(nullable = false)
	private String firstName;

	@Column(nullable = false)
	private String lastName;

	@Column(nullable = false)
	private Date birthDate;

	@JsonIgnore
	@Column(nullable = false)
	private Integer height;

	@JsonIgnore
	@Column(nullable = false)
	private Integer weight;

	@JsonIgnore
	@Column(nullable = false)
	private Boolean isSportsman;
}
