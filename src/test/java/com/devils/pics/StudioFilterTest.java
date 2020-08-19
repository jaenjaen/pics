package com.devils.pics;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class StudioFilterTest {

	@Autowired
	  private SqlSession session;
	
	@Test
	void contextLoads() {
		final String NS = "StudioFilterMapper.";
		//showAllStudio
		System.out.println(session.selectList(NS+"showAllStudio"));
	}

}
