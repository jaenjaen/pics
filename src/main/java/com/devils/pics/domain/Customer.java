package com.devils.pics.domain;

public class Customer {
	private int custId;
	private int apiId;
	private String nickname;
	private String gender;
	private String job;
	private String funnel;
	private String email;
	private String tel;
	private String apiKey;
	private String imgSrc;
	
	public Customer() {}
	
	public Customer(int custId, int apiId, String nickname, String gender, String job, String funnel,
			String email, String tel, String apiKey, String imgSrc) {
		this.custId = custId;
		this.apiId = apiId;
		this.nickname = nickname;
		this.gender = gender;
		this.job = job;
		this.funnel = funnel;
		this.email = email;
		this.tel = tel;
		this.apiKey = apiKey;
		this.imgSrc = imgSrc;
	}
	
	public int getCustId() {
		return custId;
	}

	public void setCustId(int custId) {
		this.custId = custId;
	}

	public int getApiId() {
		return apiId;
	}

	public void setApiId(int apiId) {
		this.apiId = apiId;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}

	public String getFunnel() {
		return funnel;
	}

	public void setFunnel(String funnel) {
		this.funnel = funnel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getImgSrc() {
		return imgSrc;
	}

	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}

	@Override
	public String toString() {
		return "Customer [custId=" + custId + ", apiId=" + apiId + ", nickname=" + nickname + ", gender=" + gender
				+ ", job=" + job + ", funnel=" + funnel + ", email=" + email + ", tel=" + tel
				+ ", apiKey=" + apiKey + ", imgSrc=" + imgSrc + "]";
	}		
}
