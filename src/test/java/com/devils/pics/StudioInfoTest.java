package com.devils.pics;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Studio;

@SpringBootTest
class StudioInfoTest {

	@Autowired
	  private SqlSession sqlSession;
	
	@Test
	void contextLoads() {
		String NS = "StudioInfoMapper.";
		Studio vo=sqlSession.selectOne(NS+"getStudioInfo",1);
		System.out.println(vo);
	}

}
