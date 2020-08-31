package com.devils.pics.domain;

public class Bookmark {
	private int bookId;
	private Studio studio;
	private Customer customer;
	private int stuId;
	private int custId;
	
	public Bookmark() {	}

	public Bookmark(int bookId, Studio studio, Customer customer, int stuId, int custId) {
		super();
		this.bookId = bookId;
		this.studio = studio;
		this.customer = customer;
		this.stuId = stuId;
		this.custId = custId;
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

	public int getStuId() {
		return stuId;
	}

	public void setStuId(int stuId) {
		this.stuId = stuId;
	}

	public int getCustId() {
		return custId;
	}

	public void setCustId(int custId) {
		this.custId = custId;
	}

	@Override
	public String toString() {
		return "Bookmark [bookId=" + bookId + ", studio=" + studio + ", customer=" + customer + ", stuId=" + stuId
				+ ", custId=" + custId + "]";
	}
}
