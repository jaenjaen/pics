package com.devils.pics.domain;

public class Bookmark {
	private int bookId;
	private Studio studio;
	private Customer customer;
	
	public Bookmark(int bookId, Studio studio, Customer customer) {
		this.bookId = bookId;
		this.studio = studio;
		this.customer = customer;
	}
	public Bookmark() {	}
	
	public Bookmark(Studio studio, Customer customer) {
		this.studio = studio;
		this.customer = customer;
	}
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public Studio getStudio() {
		return studio;
	}
	public void setStudio(Studio studio) {
		this.studio = studio;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	@Override
	public String toString() {
		return "Bookmark [bookId=" + bookId + ", studio=" + studio + ", customer=" + customer + "]";
	}
}
