package com.devils.pics;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Studio;

@SpringBootTest
public class StudioTest {

	@Autowired
	private SqlSession sqlSession;

	@Test
	void contextLoads() throws IOException {
		
		String ns = "StudioMapper.";
		
		/** comId로 보유 스튜디오 받아오기*/
//		List<Studio> s = sqlSession.selectList(ns+"getStudios","1234@admin.com");
//	
//		for (Studio stu:s) {
//			System.out.println(stu);
//		}
		
		/* 하나의 스튜디오 정보 얻어오기 */
//		Studio s = sqlSession.selectOne(ns+"getStudio",1154);
//		System.out.println(s);
		
	}
}
