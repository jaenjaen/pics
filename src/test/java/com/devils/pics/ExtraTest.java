package com.devils.pics;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ExtraTest {

	@Autowired
	  private SqlSession sqlSession;
	
	@Test
	void contextLoads() {
	}

}
