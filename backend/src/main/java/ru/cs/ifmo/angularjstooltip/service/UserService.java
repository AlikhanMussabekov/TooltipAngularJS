package ru.cs.ifmo.angularjstooltip.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.cs.ifmo.angularjstooltip.model.User;
import ru.cs.ifmo.angularjstooltip.repository.UserRepository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

	private UserRepository userRepository;

	@Autowired
	UserService(UserRepository userRepository){
		this.userRepository = userRepository;

		addUsers();

	}

	public ResponseEntity<?> getUser(Integer id){

		Optional<User> user = userRepository.findById(id);

		if (user.isPresent()){

			HashMap<String, Object> hashMap = new HashMap<>();
			hashMap.put("height", user.get().getHeight());
			hashMap.put("weight", user.get().getWeight());
			hashMap.put("isSportsman", user.get().getIsSportsman());

			return ResponseEntity.ok(hashMap);
		}else{
			return ResponseEntity.badRequest().body(null);
		}
	}

	public ResponseEntity<?> getUsers(){

		List<User> userList = userRepository.findAll();

		return ResponseEntity.ok(userList);
	}

	private void addUsers(){
		userRepository.save(User.builder()
				.id(1)
				.firstName("Alikhan")
				.lastName("Mussabekov")
				.birthDate(new Date())
				.height(185)
				.weight(82)
				.isSportsman(true)
				.build());

		userRepository.save(User.builder()
				.id(2)
				.firstName("Игорь")
				.lastName("Мацкевич")
				.birthDate(new Date())
				.height(180)
				.weight(70)
				.isSportsman(true)
				.build());

		userRepository.save(User.builder()
				.id(3)
				.firstName("Игорь")
				.lastName("Мацкевич")
				.birthDate(new Date())
				.height(180)
				.weight(70)
				.isSportsman(true)
				.build());
	}

}
