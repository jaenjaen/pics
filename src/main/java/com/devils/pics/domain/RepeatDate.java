package com.devils.pics.domain;

public class RepeatDate {
	private int repeatId;
	private int stuId;
	private String weekDate;
	private String time;

	public RepeatDate() {}

	public RepeatDate(int repeatId, int stuId, String weekDate, String time) {
		this.repeatId = repeatId;
		this.stuId = stuId;
		this.weekDate = weekDate;
		this.time = time;
	}

	public int getRepeatId() {
		return repeatId;
	}

	public void setRepeatId(int repeatId) {
		this.repeatId = repeatId;
	}
	
	public int getStuId() {
		return stuId;
	}

	public void setStuId(int stuId) {
		this.stuId = stuId;
	}

	public String getWeekDate() {
		return weekDate;
	}

	public void setWeekDate(String weekDate) {
		this.weekDate = weekDate;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "RepeatDate [repeatId=" + repeatId + ", stuId=" + stuId  + ", weekDate=" + weekDate + ", time=" + time + "]";
	}
}
