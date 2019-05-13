package com.mergen.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
	
	@Autowired
	ItemRepository itemRepository;
	
	public void addItem(Item item){
		itemRepository.save(item);
	}
	
	public void updateItem(Item item){
		itemRepository.save(item);
	}
	
	public void deleteItem(Item item) {
		itemRepository.delete(item);	
	}
	
	
}
