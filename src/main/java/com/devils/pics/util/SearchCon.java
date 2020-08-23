package com.devils.pics.util;

import java.util.ArrayList;

public class SearchCon {
	private String categoryId;
	private String weekDate;
	private String selectedDate;
	private String address;
	private String minSize;
	private String maxSize;
	private String minUnitPrice;
	private String maxUnitPrice;
	private String capacity;
	private ArrayList<String> searchContent;
	private String searchTag;
	private String orderCon;
	
	public SearchCon() {}

	public SearchCon(String categoryId, String weekDate, String selectedDate, String address, String minSize,
			String maxSize, String minUnitPrice, String maxUnitPrice, String capacity, ArrayList<String> searchContent,
			String searchTag, String orderCon) {
		super();
		this.categoryId = categoryId;
		this.weekDate = weekDate;
		this.selectedDate = selectedDate;
		this.address = address;
		this.minSize = minSize;
		this.maxSize = maxSize;
		this.minUnitPrice = minUnitPrice;
		this.maxUnitPrice = maxUnitPrice;
		this.capacity = capacity;
		this.searchContent = searchContent;
		this.searchTag = searchTag;
		this.orderCon = orderCon;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public String getWeekDate() {
		return weekDate;
	}

	public void setWeekDate(String weekDate) {
		this.weekDate = weekDate;
	}

	public String getSelectedDate() {
		return selectedDate;
	}

	public void setSelectedDate(String selectedDate) {
		this.selectedDate = selectedDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMinSize() {
		return minSize;
	}

	public void setMinSize(String minSize) {
		this.minSize = minSize;
	}

	public String getMaxSize() {
		return maxSize;
	}

	public void setMaxSize(String maxSize) {
		this.maxSize = maxSize;
	}

	public String getMinUnitPrice() {
		return minUnitPrice;
	}

	public void setMinUnitPrice(String minUnitPrice) {
		this.minUnitPrice = minUnitPrice;
	}

	public String getMaxUnitPrice() {
		return maxUnitPrice;
	}

	public void setMaxUnitPrice(String maxUnitPrice) {
		this.maxUnitPrice = maxUnitPrice;
	}

	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

	public ArrayList<String> getSearchContent() {
		return searchContent;
	}

	public void setSearchContent(ArrayList<String> searchContent) {
		this.searchContent = searchContent;
	}

	public String getSearchTag() {
		return searchTag;
	}

	public void setSearchTag(String searchTag) {
		this.searchTag = searchTag;
	}

	public String getOrderCon() {
		return orderCon;
	}

	public void setOrderCon(String orderCon) {
		this.orderCon = orderCon;
	}

	@Override
	public String toString() {
		return "SearchCon [categoryId=" + categoryId + ", weekDate=" + weekDate + ", selectedDate=" + selectedDate
				+ ", address=" + address + ", minSize=" + minSize + ", maxSize=" + maxSize + ", minUnitPrice="
				+ minUnitPrice + ", maxUnitPrice=" + maxUnitPrice + ", capacity=" + capacity + ", searchContent="
				+ searchContent + ", searchTag=" + searchTag + ", orderCon=" + orderCon + "]";
	}
}
