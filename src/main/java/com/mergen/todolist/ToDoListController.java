package com.mergen.todolist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mergen.user.User;

@RestController
public class ToDoListController {
	
	
	@Autowired
	ToDoListService toDoListService;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.GET, value = "/task-list")
	public List<ToDoList> getAllToDoLists(){
		return toDoListService.getAllToDoLists();
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.POST, value = "/task-list/")
	public ToDoList addToDoList(@RequestBody ToDoList toDoList){
		toDoList.setUser(new User(1L, null, null, null, null));
		toDoListService.addToDoList(toDoList);
		return toDoList;
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.GET, value = "/task-list/")
	public ToDoList getToDoList(@RequestParam("id") Long id){
		return toDoListService.getToDoListById(id);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.PUT, value = "/task-list/")
	public void updateToDoList(@RequestParam("id") Long id, @RequestBody ToDoList toDoList){
		toDoList.setId(id);
		toDoList.setUser(new User(1L, null, null, null, null));
		toDoListService.updateToDoList(toDoList);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(method = RequestMethod.DELETE, value = "/task-list/")
	public void deleteToDoList(@RequestParam("id") Long id){
		toDoListService.deleteToDoListById(id);
	}
	
	
}
