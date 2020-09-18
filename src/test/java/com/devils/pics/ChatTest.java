package com.devils.pics;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ChatTest {
	
	String ns = "ChatMapper.";
	
	@Autowired
	private SqlSession sqlSession;
	
	@Test
	void chatTest() throws IOException {
		Map map = new HashMap();
		map.put("stuId", 1153);
		map.put("custId", 20);
		map.put("sender", 0);
		int result = sqlSession.update(ns+"setAlreadyRead", map);
		System.out.println(result+"개 수정");
	}
}
