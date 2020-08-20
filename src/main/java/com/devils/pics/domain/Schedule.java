package com.devils.pics.domain;

import java.util.ArrayList;

public class Schedule {
	private int stuId;
	private ArrayList<RepeatDate> repeatDate;
	private ArrayList<ExceptionDate> exceptionDate;
	private Reservation reservation;
	
	public Schedule(int stuId, ArrayList<RepeatDate> repeatDate, ArrayList<ExceptionDate> exceptionDate,
			Reservation reservation) {
		super();
		this.stuId = stuId;
		this.repeatDate = repeatDate;
		this.exceptionDate = exceptionDate;
		this.reservation = reservation;
	}
	public Schedule() {
		super();
	}
	
	
}
