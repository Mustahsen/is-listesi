package com.mergen.todolist;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mergen.user.Users;

@Service
public class ToDoListService {
	
	@Autowired
	ToDoListRepository toDoListRepository;
	
	public List<ToDoList> getToDoListsForUser(Users user){
		List<ToDoList> toDoList = new ArrayList<ToDoList>();
		toDoListRepository.findByUserOrderByIdAsc(user).forEach(toDoList::add);
		return toDoList;
	}
	
	public List<ToDoList> getAllToDoLists(){
		List<ToDoList> toDoList = new ArrayList<ToDoList>();
		toDoListRepository.findAll().forEach(toDoList::add);
		return toDoList;
	}
	
	public ToDoList getToDoListById(Long id){
		return toDoListRepository.findById(id).orElse(null);
	}
	
	public void addToDoList(ToDoList toDoList){
		toDoListRepository.save(toDoList);
	}
	
	public void updateToDoList(ToDoList toDoList){
		toDoListRepository.save(toDoList);
	}
	
	public void deleteToDoListById(Long id){
		toDoListRepository.deleteById(id);
	}
}
