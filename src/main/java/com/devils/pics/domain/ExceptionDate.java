package com.devils.pics.domain;

public class ExceptionDate {
	private int exceptionId;
	private String startDate;
	private String endDate;
	private int stuId;
	private String exceptionTitle;
	
	public ExceptionDate() {}

	public ExceptionDate(int exceptionId, String startDate, String endDate, int stuId, String exceptionTitle) {
		this.exceptionId = exceptionId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.stuId = stuId;
		this.exceptionTitle = exceptionTitle;
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

	public String getExceptionTitle() {
		return exceptionTitle;
	}

	public void setExceptionTitle(String exceptionTitle) {
		this.exceptionTitle = exceptionTitle;
	}

	@Override
	public String toString() {
		return "ExceptionDate [exceptionId=" + exceptionId + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", stuId=" + stuId + ", exceptionTitle=" + exceptionTitle + "]";
	}
}
