package com.devils.pics.domain;

public class Category {
	private int categoryId;
	private String category;
	
	public Category() {}
	public Category(int categoryId, String category) {
		super();
		this.categoryId = categoryId;
		this.category = category;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	@Override
	public String toString() {
		return "Category [categoryId=" + categoryId + ", category=" + category + "]";
	}
	
	
	
}
