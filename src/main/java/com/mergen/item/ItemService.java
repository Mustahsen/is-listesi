package com.mergen.item;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
	
	@Autowired
	ItemRepository itemRepository;
	
	public List<Item> getItemsForToDoList(Long toDoListId){
		List<Item> itemList = new ArrayList<Item>();
		itemRepository.findByToDoListIdOrderByIdAsc(toDoListId).forEach(itemList::add);
		return itemList;
	}
	
	public Item getItemById(Long id){
		return itemRepository.findById(id).orElse(null);
	}
	
	public void addItem(Item item){
		itemRepository.save(item);
	}
	
	public void updateItem(Item item){
		itemRepository.save(item);
	}
	
	public void deleteItemById(Long id){
		itemRepository.deleteById(id);
	}
	
	
}
