package com.devils.pics.domain;

import java.util.ArrayList;

public class StudioFilter {
	private int filterId;
	private double area;
	private String option;
	private int parking;
	private int unitPrice;
	private int defaultCapacity;
	private int excharge;
	private String address;
	private int maxCapacity;
	private ArrayList<Tag> tag;
	
	public StudioFilter() {}
	
	public StudioFilter(int filterId, double area, String option, int parking, int unitPrice, int defaultCapacity,
			int excharge, String address, int maxCapacity, ArrayList<Tag> tag) {
		this.filterId = filterId;
		this.area = area;
		this.option = option;
		this.parking = parking;
		this.unitPrice = unitPrice;
		this.defaultCapacity = defaultCapacity;
		this.excharge = excharge;
		this.address = address;
		this.maxCapacity = maxCapacity;
		this.tag = tag;
	}
	public int getFilterId() {
		return filterId;
	}
	public void setFilterId(int filterId) {
		this.filterId = filterId;
	}
	public double getArea() {
		return area;
	}
	public void setArea(double area) {
		this.area = area;
	}
	public String getOption() {
		return option;
	}
	public void setOption(String option) {
		this.option = option;
	}
	public int getParking() {
		return parking;
	}
	public void setParking(int parking) {
		this.parking = parking;
	}
	public int getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(int unitPrice) {
		this.unitPrice = unitPrice;
	}
	public int getDefaultCapacity() {
		return defaultCapacity;
	}
	public void setDefaultCapacity(int defaultCapacity) {
		this.defaultCapacity = defaultCapacity;
	}
	public int getExcharge() {
		return excharge;
	}
	public void setExcharge(int excharge) {
		this.excharge = excharge;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getMaxCapacity() {
		return maxCapacity;
	}
	public void setMaxCapacity(int maxCapacity) {
		this.maxCapacity = maxCapacity;
	}
	public ArrayList<Tag> getTag() {
		return tag;
	}
	public void setTag(ArrayList<Tag> tag) {
		this.tag = tag;
	}
	@Override
	public String toString() {
		return "StudioFilter [filterId=" + filterId + ", area=" + area + ", option=" + option + ", parking=" + parking
				+ ", unitPrice=" + unitPrice + ", defaultCapacity=" + defaultCapacity + ", excharge=" + excharge
				+ ", address=" + address + ", maxCapacity=" + maxCapacity + ", tag=" + tag + "]";
	}
}
