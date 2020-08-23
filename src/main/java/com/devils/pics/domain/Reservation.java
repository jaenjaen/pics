package com.devils.pics.domain;

public class Reservation {
	private int resId;
	private int stuId;
	private Customer customer;
	private Studio studio;
	private String startDate;
	private String endDate;
	private int totalPrice;
	private String resDate;
	private int totalPeople;
	
	public Reservation() {}
	
	public Reservation(int resId, int stuId, Customer customer, Studio studio, String startDate, String endDate, int totalPrice,
			String resDate, int totalPeople) {
		this.resId = resId;
		this.stuId = stuId;
		this.customer = customer;
		this.studio = studio;
		this.startDate = startDate;
		this.endDate = endDate;
		this.totalPrice = totalPrice;
		this.resDate = resDate;
		this.totalPeople = totalPeople;
	}

	public Reservation(Customer customer,  int stuId, String startDate, String endDate) {
		this.stuId = stuId;
		this.customer = customer;
		this.startDate = startDate;
		this.endDate = endDate;
		}

	public int getResId() {
		return resId;
	}
	public void setResId(int resId) {
		this.resId = resId;
	}
	public int getStuId() {
		return stuId;
	}
	public void setStuId(int stuId) {
		this.stuId = stuId;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Studio getStudio() {
		return studio;
	}
	public void setStudio(Studio studio) {
		this.studio = studio;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public int getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getResDate() {
		return resDate;
	}
	public void setResDate(String resDate) {
		this.resDate = resDate;
	}
	public int getTotalPeople() {
		return totalPeople;
	}
	public void setTotalPeople(int totalPeople) {
		this.totalPeople = totalPeople;
	}
	@Override
	public String toString() {
		return "Reservation [resId=" + resId + ", stuId=" + stuId +", customer=" + customer + ", studio=" + studio + ", startDate="
				+ startDate + ", endDate=" + endDate + ", totalPrice=" + totalPrice + ", resDate=" + resDate
				+ ", totalPeople=" + totalPeople + "]";
	}

}
