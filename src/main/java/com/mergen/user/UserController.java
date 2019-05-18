package com.mergen.user;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	public static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> createUser(@RequestBody Users user) {
		if (userService.findUser(user) != null) {
			return new ResponseEntity(("User with username : " + user.getUsername() + "already exists"), HttpStatus.CONFLICT);
		}
		user.setRole("USER");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		return new ResponseEntity<Users>(userService.addUser(user), HttpStatus.CREATED);
	}
	

	@RequestMapping("/login")
	public Principal user(Principal principal) {
		logger.info("user logged "+ principal);
		return principal;
	}
}
