package com.devils.pics.domain;

import java.util.ArrayList;
import java.util.List;


public class Company {
	private String comId;
	private List<Studio> studioList;
	private List<StudioFilter> studioFilterList;
	private String name;
	private String address;
	private String password;
	private String tel;
	private String description;
	private String logoImg;
	private String salt;
	
	public Company() {
		super();
	}

	public Company(String comId, List<Studio> studioList, List<StudioFilter> studioFilterList, String name,
			String address, String password, String tel, String description, String logoImg, String salt) {
		super();
		this.comId = comId;
		this.studioList = studioList;
		this.studioFilterList = studioFilterList;
		this.name = name;
		this.address = address;
		this.password = password;
		this.tel = tel;
		this.description = description;
		this.logoImg = logoImg;
		this.salt = salt;
	}

	public String getComId() {
		return comId;
	}

	public void setComId(String comId) {
		this.comId = comId;
	}

	public List<Studio> getStudioList() {
		return studioList;
	}

	public void setStudioList(List<Studio> studioList) {
		this.studioList = studioList;
	}

	public List<StudioFilter> getStudioFilterList() {
		return studioFilterList;
	}

	public void setStudioFilterList(List<StudioFilter> studioFilterList) {
		this.studioFilterList = studioFilterList;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLogoImg() {
		return logoImg;
	}

	public void setLogoImg(String logoImg) {
		this.logoImg = logoImg;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	@Override
	public String toString() {
		return "Company [comId=" + comId + ", studioList=" + studioList + ", studioFilterList=" + studioFilterList
				+ ", name=" + name + ", address=" + address + ", password=" + password + ", tel=" + tel
				+ ", description=" + description + ", logoImg=" + logoImg + ", salt=" + salt + "]";
	}

	
	
}
