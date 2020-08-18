package com.devils.pics.domain;

public class RepeatDate {
	private int repeatId;
	private String weekDate;
	private String time;

	public RepeatDate() {}

	public RepeatDate(int repeatId, String weekDate, String time) {
		this.repeatId = repeatId;
		this.weekDate = weekDate;
		this.time = time;
	}

	public int getRepeatId() {
		return repeatId;
	}

	public void setRepeatId(int repeatId) {
		this.repeatId = repeatId;
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
		return "RepeatDate [repeatId=" + repeatId + ", weekDate=" + weekDate + ", time=" + time + "]";
	}
}
