package com.devils.pics.domain;

public class ExceptionDate {
	private int exceptionId;
	private String startDate;
	private String endDate;
	private int stuId;
	public ExceptionDate(int exceptionId, String startDate, String endDate, int stuId) {
		super();
		this.exceptionId = exceptionId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.stuId = stuId;
	}
	public ExceptionDate() {
		super();
	}
	public int getExceptionId() {
		return exceptionId;
	}
	public void setExceptionId(int exceptionId) {
		this.exceptionId = exceptionId;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public int getStuId() {
		return stuId;
	}
	public void setStuId(int stuId) {
		this.stuId = stuId;
	}
	@Override
	public String toString() {
		return "ExceptionDate [exceptionId=" + exceptionId + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", stuId=" + stuId + "]";
	}
}
