package com.devils.pics.domain;

import java.util.ArrayList;

public class Company {
	private String comId;
	private String name;
	private String address;
	private String password;
	private String tel;
	private String description;
	private String logoImg;
	private ArrayList<Studio> studio;
	
	public Company(String comId, String name, String address, String password, String tel, String description, String logoImg,
			ArrayList<Studio> studio) {
		this.comId = comId;
		this.name = name;
		this.address = address;
		this.password = password;
		this.tel = tel;
		this.description = description;
		this.logoImg = logoImg;
		this.studio = studio;
	}
	
	public Company() {
	}
	public String getComId() {
		return comId;
	}
	public void setComId(String comId) {
		this.comId = comId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getdescription() {
		return description;
	}
	public void setdescription(String description) {
		this.description = description;
	}
	public String getLogoImg() {
		return logoImg;
	}
	public void setLogoImg(String logoImg) {
		this.logoImg = logoImg;
	}
	public ArrayList<Studio> getStudio() {
		return studio;
	}
	public void setStudio(ArrayList<Studio> studio) {
		this.studio = studio;
	}
	@Override
	public String toString() {
		return "Company [comId=" + comId + ", name=" + name + ", address=" + address + ", password=" + password
				+ ", tel=" + tel + ", description=" + description + ", logoImg=" + logoImg + ", studio=" + studio + "]";
	}
}
