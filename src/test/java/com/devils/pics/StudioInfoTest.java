package com.devils.pics;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Studio;

@SpringBootTest
class StudioInfoTest {

	@Autowired
	private SqlSession session;
	
	@Test
	public void contextLoads() {
	}
	
	@Test
	public void getCategoryId() {
		Studio studio = new Studio(); 
		session.insert("StudioInfoMapper.getCategoryId", studio);
	}

}
