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
		List<Map<String, String>> map  = new ArrayList<>();
		map = sqlSession.selectList(ns+"getRecentComChat", "1234@admin.com");
		System.out.println(map);
	}
}
