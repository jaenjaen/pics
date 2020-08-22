package com.devils.pics;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CustomerTest {

	@Autowired
	private SqlSession sqlSession;
	private String ns = "CustomerMapper.";
	
	@Test
	void contextLoads() {
		
//		  Customer c = new Customer();
//		  c.setAge(26);
//		  c.setApiId(1); c.setApiKey("123asdfh"); 
//		  c.setEmail("jenny@sample.com"); c.setFunnel("검색");
//		  c.setGender('F'); c.setJob("회사원"); 
//		  c.setTel("010-1234-1234");
//		  c.setImgSrc("jaenjaen.jpg");
//		  sqlSession.insert(ns+"registerCustomer",c);
		 
		
//		Customer cust = sqlSession.selectOne(ns+"getCustomer",1);
//		System.out.println(cust);
		
		//sqlSession.update(ns+"updateCustomer",c);
		sqlSession.delete(ns+"deleteCustomer",6);
	}
}
