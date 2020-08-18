package com.devils.pics.domain;

import java.util.ArrayList;

public class Company {
	private String comId;
	private String name;
	private String address;
	private String password;
	private String tel;
	private String desc;
	private String logoImg;
	private ArrayList<Studio> Studio;
	
	public Company(String comId, String name, String address, String password, String tel, String desc,
			String logoImg) {
		this.comId = comId;
		this.name = name;
		this.address = address;
		this.password = password;
		this.tel = tel;
		this.desc = desc;
		this.logoImg = logoImg;
	}
		
	public Company() {}


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


	public String getDesc() {
		return desc;
	}


	public void setDesc(String desc) {
		this.desc = desc;
	}


	public String getLogoImg() {
		return logoImg;
	}


	public void setLogoImg(String logoImg) {
		this.logoImg = logoImg;
	}


	@Override
	public String toString() {
		return "Company [comId=" + comId + ", name=" + name + ", address=" + address + ", password=" + password
				+ ", tel=" + tel + ", desc=" + desc + ", logoImg=" + logoImg + "]";
	}
	
}
