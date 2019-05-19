package com.mergen.item;

import java.util.List;

import org.springframework.data.repository.CrudRepository;


public interface ItemRepository extends CrudRepository<Item, Long> {
	List<Item> findByToDoListIdOrderByIdAsc(Long toDoListId);
}
