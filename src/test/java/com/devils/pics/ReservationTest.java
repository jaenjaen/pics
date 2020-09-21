package com.devils.pics;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Reservation;

@SpringBootTest
public class ReservationTest {
	String ns = "StudioReserveMapper.";
	
	@Autowired
	private SqlSession sqlSession;
	
	@Test
	void test() throws IOException {
//		
//		List<Reservation> list = sqlSession.selectList(ns+"getWillStudioReservation",11);
//		for(Reservation r :list) {
//			System.out.println(r);
//		}
	}
}
