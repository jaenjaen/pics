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
	private String salt;
	
	public Company() {
		super();
	}

	public Company(String comId, String name, String address, String password, String tel, String description,
			String logoImg, String salt) {
		super();
		this.comId = comId;
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
		return "Company [comId=" + comId + ", name=" + name + ", address=" + address + ", password=" + password
				+ ", tel=" + tel + ", description=" + description + ", logoImg=" + logoImg + ", salt=" + salt + "]";
	}
}
