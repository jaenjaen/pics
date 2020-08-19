package com.devils.pics.domain;

import java.util.ArrayList;

public class Studio {
	private int stdId;
	private String name;
	private String desc;
	private String rule;
	private int filterId;
	private String mainImg;
	private String portImg;
	private String cadImg;
	private int floor;
	private StudioFilter studioFilter;
	private ArrayList<RepeatDate> repeatDate;
	private Company company;
	private ExceptionDate exceptionDate;
	private Category category;
	
	public Studio() {}

	public Studio(int stdId, String name, String desc, String rule, int filterId, String mainImg, String portImg,
			String cadImg, int floor, StudioFilter studioFilter, ArrayList<RepeatDate> repeatDate, Company company,
			ExceptionDate exceptionDate, Category category) {
		super();
		this.stdId = stdId;
		this.name = name;
		this.desc = desc;
		this.rule = rule;
		this.filterId = filterId;
		this.mainImg = mainImg;
		this.portImg = portImg;
		this.cadImg = cadImg;
		this.floor = floor;
		this.studioFilter = studioFilter;
		this.repeatDate = repeatDate;
		this.company = company;
		this.exceptionDate = exceptionDate;
		this.category = category;
	}

	public int getStdId() {
		return stdId;
	}

	public void setStdId(int stdId) {
		this.stdId = stdId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getRule() {
		return rule;
	}

	public void setRule(String rule) {
		this.rule = rule;
	}

	public int getFilterId() {
		return filterId;
	}

	public void setFilterId(int filterId) {
		this.filterId = filterId;
	}

	public String getMainImg() {
		return mainImg;
	}

	public void setMainImg(String mainImg) {
		this.mainImg = mainImg;
	}

	public String getPortImg() {
		return portImg;
	}

	public void setPortImg(String portImg) {
		this.portImg = portImg;
	}

	public String getCadImg() {
		return cadImg;
	}

	public void setCadImg(String cadImg) {
		this.cadImg = cadImg;
	}

	public int getFloor() {
		return floor;
	}

	public void setFloor(int floor) {
		this.floor = floor;
	}

	public StudioFilter getStudioFilter() {
		return studioFilter;
	}

	public void setStudioFilter(StudioFilter studioFilter) {
		this.studioFilter = studioFilter;
	}

	public ArrayList<RepeatDate> getRepeatDate() {
		return repeatDate;
	}

	public void setRepeatDate(ArrayList<RepeatDate> repeatDate) {
		this.repeatDate = repeatDate;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public ExceptionDate getExceptionDate() {
		return exceptionDate;
	}

	public void setExceptionDate(ExceptionDate exceptionDate) {
		this.exceptionDate = exceptionDate;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Studio [stdId=" + stdId + ", name=" + name + ", desc=" + desc + ", rule=" + rule + ", filterId="
				+ filterId + ", mainImg=" + mainImg + ", portImg=" + portImg + ", cadImg=" + cadImg + ", floor=" + floor
				+ ", studioFilter=" + studioFilter + ", repeatDate=" + repeatDate + ", company=" + company
				+ ", exceptionDate=" + exceptionDate + ", category=" + category + "]";
	}
	
	
}
