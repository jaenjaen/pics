package com.devils.pics.domain;

import java.util.ArrayList;

public class Studio { 
	private int stuId;
	private String comId;
	private int categoryId;
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
	private double avgScore;
	private int countReview;
	private ArrayList<Tag> tag;
	
	public Studio() {}

	public Studio(int stuId, String comId, int categoryId, String name, String description, String rule, String mainImg,
			String portImg, String cadImg, int floor, StudioFilter studioFilter, Company company, Category category,
			Schedule schedule, double avgScore, int countReview, ArrayList<Tag> tag) {
		super();
		this.stuId = stuId;
		this.comId = comId;
		this.categoryId = categoryId;
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
		this.avgScore = avgScore;
		this.countReview = countReview;
		this.tag = tag;
	}

	public int getStuId() {
		return stuId;
	}

	public void setStuId(int stuId) {
		this.stuId = stuId;
	}

	public String getComId() {
		return comId;
	}

	public void setComId(String comId) {
		this.comId = comId;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
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

	public double getAvgScore() {
		return avgScore;
	}

	public void setAvgScore(double avgScore) {
		this.avgScore = avgScore;
	}

	public int getCountReview() {
		return countReview;
	}

	public void setCountReview(int countReview) {
		this.countReview = countReview;
	}

	public ArrayList<Tag> getTag() {
		return tag;
	}

	public void setTag(ArrayList<Tag> tag) {
		this.tag = tag;
	}

	@Override
	public String toString() {
		return "Studio [stuId=" + stuId + ", comId=" + comId + ", categoryId=" + categoryId + ", name=" + name
				+ ", description=" + description + ", rule=" + rule + ", mainImg=" + mainImg + ", portImg=" + portImg
				+ ", cadImg=" + cadImg + ", floor=" + floor + ", studioFilter=" + studioFilter + ", company=" + company
				+ ", category=" + category + ", schedule=" + schedule + ", avgScore=" + avgScore + ", countReview="
				+ countReview + ", tag=" + tag + "]";
	}
}