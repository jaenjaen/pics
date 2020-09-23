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

import com.devils.pics.domain.Customer;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Schedule;
import com.devils.pics.service.StudioReserveService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/* 예약하기 flow
 * 1. 날짜 및 시간 가능불가능 표시
 * 2. 최대/최소 인원
 * 3. 리뷰 영역 (리뷰 객체, 평균 평점)
 * 4. 데이터 분석 정보 >> 프론트에서 chart.js로, 추천 스튜디오 목록  
 */

@RestController
@CrossOrigin(origins={"*"}, maxAge=6000)
@Api(tags= {"Pics Studio-Reservation"})
public class StudioReserveController {
	@Autowired
	private StudioReserveService studioReserveService;	

	
	private List<Reservation> resultList;
	
	@ApiOperation(value="스튜디오의 예약스케쥴 반환", response = Schedule.class)
	@GetMapping("/studio/schedule/{stuId}")
	public ResponseEntity getSchedule(@PathVariable int stuId) {
		// 페이지에 있는 studio 정보 & 세션에서 login 정보
		try {
			Schedule schedule=new Schedule();
			schedule.setStuId(stuId);
			ArrayList<ExceptionDate> exceptionDate=studioReserveService.getExceptionDate(schedule); 
			ArrayList<RepeatDate> repeatDate=studioReserveService.getRepeatDate(stuId);
			List<Reservation> reservation=studioReserveService.getReservation(schedule);
			schedule.setExceptionDate(exceptionDate);
			schedule.setRepeatDate(repeatDate);
			schedule.setReservation(reservation);
			return new ResponseEntity(schedule,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}

	@ApiOperation(value="getReservation for studio", response = List.class)
	@GetMapping("/studio/reservation/{stuId}")
	public ResponseEntity getReservation(@PathVariable int stuId) {
		Schedule schedule=new Schedule();
		schedule.setStuId(stuId);
		resultList= studioReserveService.getReservation(schedule);
		if(resultList.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}else { 
			return new ResponseEntity(resultList,HttpStatus.OK);
			}
	}
	
	@ApiOperation(value="스튜디오 예약 추가", response = Integer.class)
	@PostMapping("/studio/reservation")
	public ResponseEntity AddReservation(@RequestBody Reservation reservation) {
		try{
		System.out.println("reservation : "+reservation);
		int result=studioReserveService.AddReservation(reservation);
			return new ResponseEntity(result,HttpStatus.OK);
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity(0,HttpStatus.NO_CONTENT);
		}
	}
	
	@ApiOperation(value="스튜디오 예약 수정")
	@PutMapping("/studio/reservation")
	public ResponseEntity UpdateReservation(@RequestBody Reservation reservation) {
		//등록 시간 삽입
		try{
			System.out.println(reservation);
			studioReserveService.UpdateReservation(reservation);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception e) { 
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			}
		}
	
	@ApiOperation(value="스튜디오 예약 취소")
	@DeleteMapping("/studio/reservation/{resId}")
	public ResponseEntity DeleteReservation(@PathVariable int resId) {
		if(studioReserveService.DeleteReservations(resId)!=0) {
			return new ResponseEntity(HttpStatus.OK);
		}else return new ResponseEntity(HttpStatus.NOT_MODIFIED);
		}

	@ApiOperation(value="스튜디오 예약 예외 날짜 추가", response = Integer.class)
	@PostMapping("/studio/exceptionDate")
	public ResponseEntity AddExceptionDates(@RequestBody ExceptionDate exceptionDate) {
		try{
			System.out.println(exceptionDate);
			int result=studioReserveService.AddExceptionDates(exceptionDate);
			return new ResponseEntity(result,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity(0,HttpStatus.NO_CONTENT);
		}
	}
	
	@ApiOperation(value="예약 불가능 날짜 수정")
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
	
	@ApiOperation(value="예약 불가능 날짜 삭제")
	@DeleteMapping("/studio/exceptionDate/{exceptionId}")
	public ResponseEntity DeleteExceptionDate(@PathVariable int exceptionId) {
		try{
			studioReserveService.DeleteExceptionDate(exceptionId);
			return new ResponseEntity(HttpStatus.OK);
		}catch(Exception e) {  
			return new ResponseEntity(HttpStatus.NOT_MODIFIED);
			}
		}
	
	
	@ApiOperation(value="날짜가 지난 고객의 예약리스트 반환", response = List.class)
	@GetMapping("/customer/reservation/expired/{custId}")
	public ResponseEntity getExpiredReservation(@PathVariable int custId) {
		resultList = studioReserveService.getExpiredReservation(custId);
		if(resultList.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		else return new ResponseEntity(resultList,HttpStatus.OK);
	}
	
	@ApiOperation(value="날짜가 지나지 않은 고객의 예약리스트 반환", response = List.class)
	@GetMapping("/customer/reservation/will/{custId}")
	public ResponseEntity getWillReservation(@PathVariable int custId) {
		resultList = studioReserveService.getWillReservation(custId);
		if(resultList.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		else return new ResponseEntity(resultList,HttpStatus.OK);
	}
	
	@ApiOperation(value="스튜디오 기준 지나지 않은 예약 리스트 반환", response = List.class)
	@GetMapping("/studio/reservation/will/{stuId}")
	public ResponseEntity getWillStudioReservation(@PathVariable int stuId) {
		resultList = studioReserveService.getWillStudioReservation(stuId);
		return new ResponseEntity(resultList,HttpStatus.OK);
	}
	
	@ApiOperation(value="N월의 지난 예약리스트 반환", response = List.class)
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
			//e.printStackTrace();
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@ApiOperation(value="업체고객의 예약관리를 위한 스케쥴 반환", response = Schedule.class)
	@GetMapping("/company/schedule/{stuId}")
	public ResponseEntity getCompanySchedules(@PathVariable int stuId) {
		Schedule schedule = new Schedule();
		schedule.setStuId(stuId);
		try{
			schedule = studioReserveService.getSchedule(schedule);
			return new ResponseEntity(schedule,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	

}



