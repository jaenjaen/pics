package com.devils.pics;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Customer;

@SpringBootTest
class CustomerTest {
	
	@Autowired
	  private SqlSession session;
	
	@Test
	void contextLoads() {
		String ns = "CustomerMapper.";
		Customer c = new Customer();
		c.setAge(23);
		c.setApiId(0);
		c.setApiKey("123asdfh");
		c.setEmail("@");
		c.setFunnel("a");
		c.setGender('F');
		c.setJob("aa");
		c.setTel("0101");
		session.insert(ns+"registerCustomer",c);
	}

}
