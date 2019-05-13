package com.mergen.todolist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mergen.user.User;

@Service
public class ToDoListService {
	
	@Autowired
	ToDoListRepository toDoListRepository;
	
	public void getToDoListsForUser(User user){
		toDoListRepository.findByUser(user);
	}
	
	public void addToDoList(ToDoList toDoList){
		toDoListRepository.save(toDoList);
	}
	
	public void updateToDoList(ToDoList toDoList){
		toDoListRepository.save(toDoList);
	}
	
	public void deleteToDoList(ToDoList toDoList){
		toDoListRepository.delete(toDoList);
	}
}
