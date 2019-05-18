package com.mergen.item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mergen.todolist.ToDoList;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {
	
	@Autowired
	ItemService itemService;
	
	@RequestMapping(method = RequestMethod.GET, value = "/items/all/")
	public List<Item> getAllItemsForList(@RequestParam("toDoListId") Long toDoListId){
		return itemService.getItemsForToDoList(toDoListId);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/items/")
	public Item getItemForList(@RequestParam("toDoListId") Long toDoListId, @RequestParam("itemId") Long itemId){
		return itemService.getItemForToDoList(toDoListId, itemId);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/items/")
	public Item addItemOfList(@RequestParam("toDoListId") Long toDoListId, @RequestBody Item item){
		item.setToDoList(new ToDoList(toDoListId, null, null, null));
		itemService.addItem(item);
		return item;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/items/")
	public void updateItemOfList(@RequestParam("toDoListId") Long toDoListId, @RequestBody Item item){
		item.setToDoList(new ToDoList(toDoListId, null, null, null));
		itemService.updateItem(item);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/items/")
	public void deleteItemOfList(@RequestParam("itemId") Long itemId){
		itemService.deleteItemById(itemId);
	}

}
