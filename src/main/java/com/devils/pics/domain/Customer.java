package com.devils.pics.domain;

public class Customer {
	private int custId;
	private int apiId;
	private char gender;
	private int age;
	private String job;
	private String funnel;
	private String email;
	private String tel;
	private String apiKey;

	public Customer(int custId, char gender, int age, String job, String funnel, String email, String tel,
			String apiKey) {
		this.custId = custId;
		this.gender = gender;
		this.age = age;
		this.job = job;
		this.funnel = funnel;
		this.email = email;
		this.tel = tel;
		this.apiKey = apiKey;
	}
	
	public Customer() {

	}

	public int getCustId() {
		return custId;
	}
	
	public void setCustId(int custId) {
		this.custId = custId;
	}
	public char getGender() {
		return gender;
	}
	public void setGender(char gender) {
		this.gender = gender;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
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
	@Override
	public String toString() {
		return "Customer [custId=" + custId + ", gender=" + gender + ", age=" + age + ", job=" + job + ", funnel="
	
				+ funnel + ", email=" + email + ", tel=" + tel + ", apiKey=" + apiKey + "]";
	}
		
}
