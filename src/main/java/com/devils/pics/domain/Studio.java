package com.devils.pics.domain;

import java.util.ArrayList;

public class Studio {
	private int stdId;
	private String name;
	private String description;
	private String rule;
	private String mainImg;
	private String portImg;
	private String cadImg;
	private int floor;
	private StudioFilter studioFilter;
	private Company company;
	private Category category;
	private Schedule schedule; 

	public Studio() {}

	public Studio(int stdId, String name, String description, String rule, String mainImg, String portImg,
			String cadImg, int floor, StudioFilter studioFilter, Company company, Category category,
			Schedule schedule) {
		super();
		this.stdId = stdId;
		this.name = name;
		this.description = description;
		this.rule = rule;
		this.mainImg = mainImg;
		this.portImg = portImg;
		this.cadImg = cadImg;
		this.floor = floor;
		this.studioFilter = studioFilter;
		this.company = company;
		this.category = category;
		this.schedule = schedule;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRule() {
		return rule;
	}

	public void setRule(String rule) {
		this.rule = rule;
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

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Schedule getSchedule() {
		return schedule;
	}

	public void setSchedule(Schedule schedule) {
		this.schedule = schedule;
	}

	@Override
	public String toString() {
		return "Studio [stdId=" + stdId + ", name=" + name + ", description=" + description + ", rule=" + rule
				+ ", mainImg=" + mainImg + ", portImg=" + portImg + ", cadImg=" + cadImg + ", floor=" + floor
				+ ", studioFilter=" + studioFilter + ", company=" + company + ", category=" + category + ", schedule="
				+ schedule + "]";
	}
	
}
