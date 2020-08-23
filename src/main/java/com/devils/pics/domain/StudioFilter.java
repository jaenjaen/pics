package com.devils.pics.domain;

public class StudioFilter {
	private int filterId;
	private int stuId;
	private double size;
	private String options;
	private int parking;
	private int unitPrice;
	private int defaultCapacity;
	private int excharge;	
	private String address;
	private int maxCapacity;
	
	public StudioFilter() {}

	public StudioFilter(int filterId, int stuId, double size, String options, int parking, int unitPrice,
			int defaultCapacity, int excharge, String address, int maxCapacity) {
		super();
		this.filterId = filterId;
		this.stuId = stuId;
		this.size = size;
		this.options = options;
		this.parking = parking;
		this.unitPrice = unitPrice;
		this.defaultCapacity = defaultCapacity;
		this.excharge = excharge;
		this.address = address;
		this.maxCapacity = maxCapacity;
	}

	public int getFilterId() {
		return filterId;
	}

	public void setFilterId(int filterId) {
		this.filterId = filterId;
	}

	public int getStuId() {
		return stuId;
	}

	public void setStuId(int stuId) {
		this.stuId = stuId;
	}

	public double getSize() {
		return size;
	}

	public void setSize(double size) {
		this.size = size;
	}

	public String getOptions() {
		return options;
	}

	public void setOptions(String options) {
		this.options = options;
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

	@Override
	public String toString() {
		return "StudioFilter [filterId=" + filterId + ", stuId=" + stuId + ", size=" + size + ", options=" + options
				+ ", parking=" + parking + ", unitPrice=" + unitPrice + ", defaultCapacity=" + defaultCapacity
				+ ", excharge=" + excharge + ", address=" + address + ", maxCapacity=" + maxCapacity + "]";
	}
}
