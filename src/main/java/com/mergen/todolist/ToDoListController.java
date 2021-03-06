package com.mergen.todolist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mergen.item.ItemService;
import com.mergen.user.UserService;
import com.mergen.user.Users;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ToDoListController {
	
	
	@Autowired
	ToDoListService toDoListService;
	
	@Autowired
	ItemService itemService;
	
	@Autowired
	UserService userService;
	
	@RequestMapping(method = RequestMethod.GET, value = "/task-list/all/")
	public List<ToDoList> getAllToDoLists(){
		return toDoListService.getAllToDoLists();
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/task-list/user/")
	public List<ToDoList> getAllToDoListsForUser(@RequestParam("username") String username){
		return toDoListService.getToDoListsForUser(userService.findUser(new Users(null, username, null, null, null, null)));
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/task-list/")
	public ToDoList getToDoList(@RequestParam("id") Long id){
		return toDoListService.getToDoListById(id);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/task-list/")
	public ToDoList addToDoList(@RequestBody ToDoList toDoList, @RequestParam("username") String username){
		toDoList.setUser(userService.findUser(new Users(null, username, null, null, null, null)));
		toDoListService.addToDoList(toDoList);
		return toDoList;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/task-list/")
	public void updateToDoList(@RequestParam("id") Long id, @RequestParam("username") String username, @RequestBody ToDoList toDoList){
		toDoList.setId(id);
		toDoList.setUser(userService.findUser(new Users(null, username, null, null, null, null)));
		toDoListService.updateToDoList(toDoList);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/task-list/")
	public ResponseEntity<ToDoList> deleteToDoList(@RequestParam("id") Long id){
		if(toDoListService.getToDoListById(id) != null) {
			itemService.getItemsForToDoList(id).forEach(item -> itemService.deleteItemById(item.getId()));
			toDoListService.deleteToDoListById(id);
			return new ResponseEntity<ToDoList>(HttpStatus.ACCEPTED);
		}else {
			return new ResponseEntity<ToDoList>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
}
