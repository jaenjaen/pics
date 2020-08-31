package com.devils.pics;

import java.sql.Date;
import java.text.SimpleDateFormat;
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
import com.devils.pics.service.CustomerService;
import com.devils.pics.service.StudioInfoService;
import com.devils.pics.service.StudioReserveService;

import ch.qos.logback.core.subst.Token.Type;

@SpringBootTest
class StudioReserveTest {
	@Autowired
	  private SqlSession sqlSession;
	@Autowired
	private StudioReserveService reserveService;

	@Autowired
	private StudioInfoService infoService;

	@Autowired
	private CustomerService customerService;
	
	@Test
	void contextLoads() throws Exception {	

		String NS = "StudioReserveMapper.";
		Customer customer=sqlSession.selectOne("CustomerMapper.getCustomer",1);
		Studio studio=sqlSession.selectOne("StudioInfoMapper.getStudioInfo",10);

//		System.out.println("==================== getExceptionDate ====================");
//		try {
//		List<ExceptionDate> ExceptionVO=sqlSession.selectList(NS+"getExceptionDate",studio);
//		List<RepeatDate> RepeatVO=sqlSession.selectList(NS+"getRepeatDate",studio);
//		System.out.println(ExceptionVO+"\n"+RepeatVO);
//		}catch (NullPointerException e) {
//			System.out.println(e.getMessage());
//		}
		

//		System.out.println("==================== Reserve ====================");
//		
		Reservation reservation =new Reservation(1, 13, customer, studio, "2020-08-19", 
				"2020-08-21", 150000,"2020-08-11", 7);
//		System.out.println(customer);
//		System.out.println(studio);
//		System.out.println(reservation);
		//		try {
//		int result=sqlSession.insert(NS+"reserve",reservation);
//		System.out.println(reservation);
//		}catch (NullPointerException e) {System.out.println("등록 과정에 문제가 있나봐!!!");}

//		System.out.println("==================== getReservations ====================");
		List<Reservation> resInfo=new ArrayList<Reservation>();
//		resInfo.setResId(1);;
//		resInfo.setCustomer(customer);
//		resInfo.setStuId(studio.getStuId());
//		resInfo.setStartDate("2020-08-20 00:00:00");
//		resInfo.setEndDate("2020-08-22 00:00:00");
//		resInfo.setResDate("2020-08-22 00:00:00");
//		resInfo.setTotalPrice(20000);
//		resInfo.setTotalPeople(3);
//		resInfo.add(new Reservation(3));
//		resInfo.add(new Reservation(4));
//		resInfo.add(new Reservation(5));
//		System.out.println(resInfo);
		List<Reservation> reserveVO = sqlSession.selectList(NS+"getReservation");
//		for(Reservation re : reserveVO )
//			System.out.println(re );
		

//		System.out.println("==================== exceptionDates ====================");
//		try {
//		int result = sqlSession.insert(NS+"exceptionDates",resInfo);
//		System.out.println(result);
//		}catch (NullPointerException e) {
//			System.out.println("예외 일정 등록에 실패했습니다.");
//		}

//		Customer customer=customerService.getCustomer(1);
//		List<Studio> studio=infoService.getStudioInfo(10);
//		Reservation reservation =new Reservation(studio.get(0).getStuId(),customer,"2020-08-19","2020-08-21",250000,"2020-08-10",5);

//		System.out.println("==================== UpdateReservation ====================");
//		try {
//		int result = sqlSession.update(NS+"UpdateReservation",resInfo);
//		System.out.println(result);
//		}catch (NullPointerException e) {
//			System.out.println("예외 일정 등록에 실패했습니다.");
//		}
//		
//		System.out.println("==================== UpdateExceptionDates ====================");
//		try {
//		int result = sqlSession.update(NS+"UpdateExceptionDates",resInfo);
//		System.out.println(result);
//		}catch (NullPointerException e) {
//			System.out.println("예외 일정 등록에 실패했습니다.");
//		}
		
//		System.out.println("==================== DeleteReservations ====================");
//		System.out.println(resInfo);
//		try {
//		sqlSession.delete(NS+"DeleteReservations",resInfo);
//		}catch (NullPointerException e) {
//			System.out.println("예외 일정 등록에 실패했습니다.");
//		}
		
//		System.out.println("==================== DeleteExceptionDates ====================");
//		try {
//		int result = sqlSession.delete(NS+"DeleteExceptionDates",resInfo);
//		System.out.println(result);
//		}catch (NullPointerException e) {
//			System.out.println("예외 일정 등록에 실패했습니다.");
//		}
		
		
		
		
//		System.out.println("==================== DAO & Service Test ====================");
//		System.out.println("==================== getExceptionDate ====================");
//		try {
//		List<ExceptionDate> exceptionDateList=new ArrayList<ExceptionDate>();
//		for(ExceptionDate ex:reserveService.getExceptionDate(11))
//			exceptionDateList.add(ex);
//		System.out.println(exceptionDateList);
//		}catch (Exception e) {
//			System.out.println(e.getMessage()+"이용 고객이 없는 스튜디오 입니다");
//			}
//		
//		System.out.println("==================== DAO & Service Test ====================");
//		System.out.println("==================== getRepeatDate ====================");
//		try {
//		List<RepeatDate> repeDateList=new ArrayList<RepeatDate>();
//		for(RepeatDate re:reserveService.getRepeatDate(11))
//			repeDateList.add(re);
//		System.out.println(repeDateList);
//		}catch (Exception e) {
//			System.out.println(e.getMessage()+"이용 고객이 없는 스튜디오 입니다");
//			}
//		
//		System.out.println("==================== AddexceptionDates ====================");
//		try {
//			System.out.println(reserveService.AddexceptionDates(reservation));
//		}catch (NullPointerException e) {System.out.println("exptionDate에 등록");}

		System.out.println("==================== reserve ====================");
		try {
			System.out.println(reserveService.AddReservation(reservation));
		}catch (NullPointerException e) {System.out.println("예약에 실패했습니다.");}

		
	}
}
