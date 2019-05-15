package com.mergen.item;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mergen.todolist.ToDoList;

@Entity
@Table(name="items")
public class Item {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="item_id")
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name="deadline")
	private Date deadline;
	
	@Column(name="status")
	private boolean status;
	
	@Column(name="dependent_item_id")
	private Long dependentItemId;
	
	@ManyToOne
	@JoinColumn(name = "list_id")
	@JsonBackReference
	private ToDoList toDoList;

	public Item() {
	}

	public Item(Long id, String name, String description, Date deadline, boolean status, Long dependentItemId,
			ToDoList toDoList) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.deadline = deadline;
		this.status = status;
		this.dependentItemId = dependentItemId;
		this.toDoList = toDoList;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Long getDependentItemId() {
		return dependentItemId;
	}

	public void setDependentItemId(Long dependentItemId) {
		this.dependentItemId = dependentItemId;
	}

	public ToDoList getToDoList() {
		return toDoList;
	}

	public void setToDoList(ToDoList toDoList) {
		this.toDoList = toDoList;
	}
}
