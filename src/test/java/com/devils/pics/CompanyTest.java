package com.devils.pics;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Company;

@SpringBootTest
class CompanyTest {
	
	@Autowired
	  private SqlSession session;
	
	@Test
	void contextLoads() throws IOException {
		
		String ns = "CompanyMapper.";
		
		/*
		 * Company c = new Company(); c.setComId("aa"); c.setName("12");
		 * c.setAddress("서울시"); c.setPassword("123"); c.setTel("111-111-1111");
		 * c.setLogoImg("aa.png");
		 * 
		 * session.insert(ns+"registerCompany",c);
		 */
		
	}

}
