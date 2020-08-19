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

import com.devils.pics.domain.Studio;

@SpringBootTest
class PicStudioInfoTest {
	@Autowired
	SqlSession sqlSession; 
	
	@Test
	void contextLoads() throws IOException {

		String NS = "StudioInfoMapper.";
		Studio vo=sqlSession.selectOne(NS+"getStudioInfo",1);
		System.out.println(vo);
	}

}
