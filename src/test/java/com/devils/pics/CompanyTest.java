package com.devils.pics;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Company;
import com.devils.pics.domain.Studio;

@SpringBootTest
public class CompanyTest {

	@Autowired
	private SqlSession sqlSession;

	@Test
	void contextLoads() throws IOException {
		
		String ns = "CompanyMapper.";
		
		
/*		  Company c = new Company(); c.setComId("66@sample.com"); c.setName("이랜드");
		  c.setAddress("대구시"); c.setPassword("1234"); c.setTel("111-111-1111");
		  c.setLogoImg("eland.png");
		  
		  sqlSession.insert(ns+"registerCompany",c);*/
		 
		
		/*
		 * List<Company> list= sqlSession.selectList(ns+"getCompany"); for(Company
		 * c:list) { System.out.println(c); }
		 */
		
//		Company c1 = new Company();
//		c1.setComId("11@sample.com");
//		
//		Company c2 = new Company();
//		c2.setComId("22@sample.com");
//		c2.setPassword("1234");
//		Company c1return = sqlSession.selectOne(ns+"getCompany", c1);
//		Company c2return = sqlSession.selectOne(ns+"getCompany", c2);
//		
//		System.out.println(c1return);
//		System.out.println(c2return);
		
		//sqlSession.delete(ns+"deleteCompany","66@sample.com");
		
		Company cp = sqlSession.selectOne(ns+"getCompanyInfo", "66@sample.com");
//		List<Studio> st  = sqlSession.selectList(ns+"getStudio", "66@sample.com");
		System.out.println(cp.getStudioFilterList());
	}
}
