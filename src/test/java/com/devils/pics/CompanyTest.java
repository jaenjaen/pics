package com.devils.pics;

import java.io.IOException;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CompanyTest {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Test
	void contextLoads() throws IOException {
		
		String ns = "CompanyMapper.";
		
		/*
		 * Company c = new Company(); c.setComId("aa"); c.setName("12");
		 * c.setAddress("서울시"); c.setPassword("123"); c.setTel("111-111-1111");
		 * c.setLogoImg("aa.png");
		 * 
		 * sqlSession.insert(ns+"registerCompany",c);
		 */
		
	}
}
