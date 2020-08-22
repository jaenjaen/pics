package com.devils.pics;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Customer;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Schedule;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;

@SpringBootTest
class StudioReserveTest {
	@Autowired
	  private SqlSession sqlSession;
//	@Autowired
//	private StudioReserveService service;

	@Test
	void contextLoads() {
		String NS = "StudioReserveMapper.";
//		Customer customer=sqlSession.selectOne("CustomerMapper.getCustomer",1);
//		Studio studio=sqlSession.selectOne("StudioInfoMapper.getStudioInfo",10);

//		System.out.println("==================== getExceptionDate ====================");
//		try {
//		List<ExceptionDate> ExceptionVO=sqlSession.selectList(NS+"getExceptionDate",studio);
//		List<RepeatDate> RepeatVO=sqlSession.selectList(NS+"getRepeatDate",studio);
//		System.out.println(ExceptionVO+"\n"+RepeatVO);
//		}catch (NullPointerException e) {
//			System.out.println(e.getMessage());
//		}
		
	
//		System.out.println("==================== checkReservation ===================="); 
//		System.out.println(customer);
//		int result=sqlSession.selectOne(NS+"checkReservation",new Reservation(customer,10,"2020-08-21","2020-08-21"));
//		if(result!=0) 
//			System.out.println("이미 예약하신 내역이 있습니다. 마이페이지에서 확인하세요.");
//		else System.out.println("중복된 예약 없습니다 ~! 등록 진행하세요.");

//		System.out.println("==================== Reservation ====================");
//		
//		Reservation reservation =new Reservation(1, 13, customer, studio, "2020-08-19", 
//				"2020-08-21", 150000,"2020-08-11", 7);
//		try {
//		int result=sqlSession.insert(NS+"reserve",reservation);
//		System.out.println(result);
//		}catch (NullPointerException e) {System.out.println("등록 과정에 문제가 생겼나봐!!!");}

//		System.out.println("==================== reservation (마이 페이지 예약 내역) ====================");
//		try {
//		List<Reservation> reserveVO=sqlSession.selectList(NS+"reservations");
//		System.out.println(reserveVO);
//		}catch (NullPointerException e) {
//			System.out.println("예약 내역이 없습니다.");
//		}
		
		
//		System.out.println("==================== DAO & Service Test ====================");
//		System.out.println("==================== getAccCustomer ====================");
//		try {
//		System.out.println(service.getAccCustomer(1));
//		}catch (NullPointerException e) {System.out.println("이용 고객이 없는 스튜디오 입니다");}
//		
//		System.out.println("==================== getReview ====================");
//		try {
//			List<Review> reviewVO=service.getStudioReviews(idList);
//		}catch (NullPointerException e) {System.out.println("이용 고객이 없는 스튜디오 입니다");}
//		
//		System.out.println("==================== getTags ====================");
//		try {
//			Tag tagVO=service.getTags(1);
//		}catch (NullPointerException e) {System.out.println("태그가...없나?");}

//		System.out.println("==================== getBookmark ====================");
//		try {
//			int vo=service.checkBookmark(idList);
//			System.out.println("vo : "+vo);
//		}catch (NullPointerException e) {System.out.println("태그가...없나?");}
//
	}
}
