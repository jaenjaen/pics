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
import com.devils.pics.service.CustomerService;
import com.devils.pics.service.StudioInfoService;
import com.devils.pics.service.StudioReserveService;

@SpringBootTest
class StudioReserveTest {
//	@Autowired
//	  private SqlSession sqlSession;
	@Autowired
	private StudioReserveService reserveService;

	@Autowired
	private StudioInfoService infoService;

	@Autowired
	private CustomerService customerService;
	
	@Test
	void contextLoads() throws Exception {
//		String NS = "StudioReserveMapper.";
//		Customer customer=sqlSession.selectOne("CustomerMapper.getCustomer",1);
//		Studio studio=sqlSession.selectOne("StudioInfoMapper.getStudioInfo",10);
//
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
//		Reservation reservation =new Reservation(1, 13, customer, studio, "2020-08-19", 
//				"2020-08-21", 150000,"2020-08-11", 7);
//		System.out.println(customer);
//		System.out.println(studio);
//		System.out.println(reservation);
		//		try {
//		int result=sqlSession.insert(NS+"reserve",reservation);
//		System.out.println(reservation);
//		}catch (NullPointerException e) {System.out.println("등록 과정에 문제가 있나봐!!!");}

//		System.out.println("==================== reservations ====================");
//		Reservation resInfo=new Reservation();
//		resInfo.setCustomer(customer);
//		resInfo.setStuId(studio.getStuId());
//		System.out.println(resInfo);
//		resInfo.setStartDate("2020-08-20 00:00:00");
//		resInfo.setEndDate("2020-08-22 00:00:00");
//		try {
//		List<Reservation> reserveVO = sqlSession.selectList(NS+"reservations",resInfo);
//		System.out.println(reserveVO);
//		}catch (NullPointerException e) {
//			System.out.println("예약 내역이 없습니다.");
//		}

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
//
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

//		System.out.println("==================== reserve ====================");
//		try {
//			System.out.println(reserveService.reserve(reservation));
//		}catch (NullPointerException e) {System.out.println("예약에 실패했습니다.");}

	}
}
