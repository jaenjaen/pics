package com.devils.pics.service;

import java.util.ArrayList;
import java.util.List;

import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Studio;

public interface StudioReserveService {
	public ArrayList<ExceptionDate> getExceptionDate(Studio studio); //예외 일정  
	public ArrayList<RepeatDate> getRepeatDate(Studio studio); 	// 영업 시간 및 날짜 주기
	public int reserve(Reservation reservation); // 예약하기
	public int AddexceptionDates(Reservation reservation);	// 예약 중복 체크, 예약 이력 불러오기(스튜디오/고객/스튜디오&고객  기준) 
}
