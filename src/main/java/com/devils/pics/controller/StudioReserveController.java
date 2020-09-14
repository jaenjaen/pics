package com.devils.pics.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Schedule;
import com.devils.pics.service.StudioReserveService;

/* 예약하기 flow
 * 1. 날짜 및 시간 가능불가능 표시
 * 2. 최대/최소 인원
 * 3. 리뷰 영역 (리뷰 객체, 평균 평점)
 * 4. 데이터 분석 정보 >> 프론트에서 chart.js로, 추천 스튜디오 목록  
 */

@RestController
@CrossOrigin(origins={"*"}, maxAge=6000)
public class StudioReserveController {
	@Autowired
	private StudioReserveService studioReserveService;	

	
	private List<Reservation> resultList;
	
	// 1. 예약 불가능/가능 날짜 받아서 Schedule로 옮기기
	@GetMapping("/studio/schedule/{stuId}")
	public ResponseEntity getSchedule(@PathVariable int stuId) {
		// 페이지에 있는 studio 정보 & 세션에서 login 정보
		try {
			Schedule schedule=new Schedule();
			ArrayList<ExceptionDate> exceptionDate=studioReserveService.getExceptionDate(stuId); 
			ArrayList<RepeatDate> repeatDate=studioReserveService.getRepeatDate(stuId);
			List<Reservation> reservation=studioReserveService.getReservation(new Reservation(stuId));
			schedule.setStuId(stuId);
			schedule.setExceptionDate(exceptionDate);
			schedule.setRepeatDate(repeatDate);
			schedule.setReservation(reservation);
			return new ResponseEntity(schedule,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}

	//2.getReservation for studio
	@GetMapping("/studio/reservation/{stuId}")
	public ResponseEntity getReservation(@PathVariable int stuId) {
		Reservation reservation = new Reservation(stuId);
		resultList= studioReserveService.getReservation(reservation);
		if(resultList.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}else { 
			return new ResponseEntity(resultList,HttpStatus.OK);
			}
	}
	
	// 3. reservation 테이블에 추가, 예약 일자 
	@PostMapping("/studio/reservation")
	public ResponseEntity AddReservation(@RequestBody Reservation reservation) {
		//등록 시간 삽입		
		try{
		int result=studioReserveService.AddReservation(reservation);
			return new ResponseEntity(result,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity(0,HttpStatus.NO_CONTENT);
		}
	}
	
	// 4. reservation,예약 불가능 일자 update 
	@PutMapping("/studio/reservation")
	public ResponseEntity UpdateReservation(@RequestBody Reservation reservation) {
		//등록 시간 삽입
		try{
			studioReserveService.UpdateReservation(reservation);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception e) { 
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			}
		}
	
	// 5. 예약취소
	@DeleteMapping("/studio/reservation/{resId}")
	public ResponseEntity DeleteReservation(@PathVariable int resId) {
		if(studioReserveService.DeleteReservations(resId)!=0) {
			return new ResponseEntity(HttpStatus.OK);
		}else return new ResponseEntity(HttpStatus.NOT_MODIFIED);
		}

	// 3. Exception 테이블에 추가, 예약 일자 
	@PostMapping("/studio/exceptionDate")
	public ResponseEntity AddExceptionDates(@RequestBody ExceptionDate exceptionDate) {
		try{
		int result=studioReserveService.AddExceptionDates(exceptionDate);
			return new ResponseEntity(result,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity(0,HttpStatus.NO_CONTENT);
		}
	}
	
	// 4. Exception 예약 불가능 일자 update 
	@PutMapping("/studio/exceptionDate")
	public ResponseEntity UpdateExceptionDate(@RequestBody ExceptionDate exceptionDate) {
		//등록 시간 삽입
		try{
			studioReserveService.UpdateExceptionDate(exceptionDate);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception e) { 
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			}
		}
	
	// 5. Exception 삭제
	@DeleteMapping("/studio/exceptionDate/{exceptionDateList}")
	public ResponseEntity DeleteExceptionDates(@PathVariable List<ExceptionDate> exceptionDateList) {
		try{
			studioReserveService.DeleteExceptionDates(exceptionDateList);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception e) {  
			return new ResponseEntity(HttpStatus.NOT_MODIFIED);
			}
		}
	
	
	//6. 이미 지난 예약
	@GetMapping("/customer/reservation/expired/{custId}")
	public ResponseEntity getExpiredReservation(@PathVariable int custId) {
		resultList = studioReserveService.getExpiredReservation(custId);
		if(resultList.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		else return new ResponseEntity(resultList,HttpStatus.OK);
	}
	
	//7. 앞으로 남은 예약
	@GetMapping("/customer/reservation/will/{custId}")
	public ResponseEntity getWillReservation(@PathVariable int custId) {
		resultList = studioReserveService.getWillReservation(custId);
		if(resultList.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		else return new ResponseEntity(resultList,HttpStatus.OK);
	}
	
	//8.n월의 지난 예약
	@GetMapping("/customer/reservation/expired/{custId}/{startDate}/{endDate}")
	public ResponseEntity getMonthReservation(@PathVariable int custId, @PathVariable String startDate, @PathVariable String endDate) {
		Reservation reservation = new Reservation();
		reservation.setCustId(custId);
		reservation.setStartDate(startDate);
		reservation.setEndDate(endDate);
		
		try{
			resultList = studioReserveService.getMonthReservation(reservation);
			if(resultList.isEmpty()) return new ResponseEntity(HttpStatus.NO_CONTENT);
			else return new ResponseEntity(resultList,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		
	}

	}



