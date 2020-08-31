package com.devils.pics.domain;

import java.util.ArrayList;
import java.util.List;

public class Schedule {
	private int stuId;
	private ArrayList<RepeatDate> repeatDate;
	private ArrayList<ExceptionDate> exceptionDate;
	private List<Reservation> reservation;
	
	public Schedule(int stuId, ArrayList<RepeatDate> repeatDate, ArrayList<ExceptionDate> exceptionDate,
			List<Reservation> reservation) {
		this.stuId = stuId;
		this.repeatDate = repeatDate;
		this.exceptionDate = exceptionDate;
		this.reservation = reservation;
	}

	public Schedule(int stuId) {
		this.stuId = stuId;
	}
	public Schedule() {}

	public int getStuId() {
		return stuId;
	}

	public void setStuId(int stuId) {
		this.stuId = stuId;
	}

	public ArrayList<RepeatDate> getRepeatDate() {
		return repeatDate;
	}

	public void setRepeatDate(ArrayList<RepeatDate> repeatDate) {
		this.repeatDate = repeatDate;
	}

	public ArrayList<ExceptionDate> getExceptionDate() {
		return exceptionDate;
	}

	public void setExceptionDate(ArrayList<ExceptionDate> exceptionDate) {
		this.exceptionDate = exceptionDate;
	}

	public List<Reservation> getReservation() {
		return reservation;
	}

	public void setReservation(List<Reservation> reservation) {
		this.reservation = reservation;
	}

	@Override
	public String toString() {
		return "Schedule [stuId=" + stuId + ", repeatDate=" + repeatDate + ", exceptionDate=" + exceptionDate
				+ ", reservation=" + reservation + "]";
	}
	
}
