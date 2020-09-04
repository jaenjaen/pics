package com.devils.pics.service;

import java.util.ArrayList;
import java.util.List;

import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Studio;

public interface StudioReserveService {
	public ArrayList<ExceptionDate> getExceptionDate(int stuId); //예외 일정  
	public ArrayList<RepeatDate> getRepeatDate(int stuId); 	// 영업 시간 및 날짜 주기
	public int AddReservation(Reservation reservation); // 예약하기
	public int AddExceptionDates(Reservation reservation);
	public List<Reservation> getReservation(Reservation reservation); // 예약 중복 체크, 예약 이력 불러오기(스튜디오/고객/스튜디오&고객  기준)
	public int UpdateReservation(Reservation reservation); //예약 내역 업데이트
	public int UpdateExceptionDate(Reservation reservation); //예약 불가 테이블 업데이트
	public int DeleteReservations(int resId); //예약 취소
	public int DeleteExceptionDates(List<Reservation> reservationList); //예약 불가 테이블 업데이트\
	public List<Reservation> getExpiredReservation(int custId); //지난예약
	public List<Reservation> getWillReservation(int custId);//앞으로 남은 예약
}
