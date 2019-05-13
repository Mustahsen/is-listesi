package com.mergen.todolist;

import org.springframework.data.repository.CrudRepository;
import com.mergen.user.User;
import com.mergen.todolist.ToDoList;
import java.util.List;

public interface ToDoListRepository extends CrudRepository<ToDoList, Long> {
	List<ToDoList> findByUser(User user);
}
