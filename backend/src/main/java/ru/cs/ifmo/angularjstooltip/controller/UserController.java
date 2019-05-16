package ru.cs.ifmo.angularjstooltip.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.cs.ifmo.angularjstooltip.service.UserService;

import java.util.HashMap;

@RestController
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService){
		this.userService = userService;
	}

	@GetMapping("/index")
	public String index(){
		return "index";
	}

	@GetMapping("/users")
	public ResponseEntity<?> getUsers(){
		return this.userService.getUsers();
	}

	@GetMapping("/user")
	public ResponseEntity<?> getUser(@RequestParam Integer id){
		return this.userService.getUser(id);
	}

}
