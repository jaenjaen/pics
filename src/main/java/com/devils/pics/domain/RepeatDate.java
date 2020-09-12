package com.devils.pics.domain;

public class RepeatDate {
	private int repeatId;
	private int stuId;
	private String weekday;
	private String time;

	public RepeatDate() {}

	public RepeatDate(int repeatId, int stuId, String weekday, String time) {
		this.repeatId = repeatId;
		this.stuId = stuId;
		this.weekday = weekday;
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

	public String getWeekday() {
		return weekday;
	}

	public void setWeekday(String weekday) {
		this.weekday = weekday;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "RepeatDate [repeatId=" + repeatId + ", stuId=" + stuId  + ", weekday=" + weekday + ", time=" + time + "]";
	}
}
