package com.devils.pics.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Customer;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Schedule;
import com.devils.pics.domain.Studio;
import com.devils.pics.service.StudioInfoService;
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
	@Autowired
	private StudioInfoService studioInfoService;
	
	// 1. 예약 불가능/가능 날짜 받아서 Schedule로 옮기기
	@GetMapping("/getSchedules/{stuId}")
	public ResponseEntity getSchedules(@PathVariable int stuId) {
		// 페이지에 있는 studio 정보 & 세션에서 login 정보
		try {
			Schedule schedule=new Schedule();
			ArrayList<ExceptionDate> exceptionDate=new ArrayList<ExceptionDate>(); 
			ArrayList<RepeatDate> repeatDate=new ArrayList<RepeatDate>(); 
			exceptionDate=studioReserveService.getExceptionDate(stuId);
			repeatDate=studioReserveService.getRepeatDate(stuId);
			
			schedule.setExceptionDate(exceptionDate);
			schedule.setRepeatDate(repeatDate);
			return new ResponseEntity(schedule,HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}

	// 2. reservation 테이블에 추가, 예약 일자 
	@PostMapping("/reserve")
	public ResponseEntity getExceptionDate(@RequestBody Reservation reservation) {
		//time 받아서 startDate/endDate 만들어줘야 함.
		if(studioReserveService.reserve(reservation)==1) {
			studioReserveService.AddexceptionDates(reservation);
			return new ResponseEntity(HttpStatus.OK);
		}else
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}



