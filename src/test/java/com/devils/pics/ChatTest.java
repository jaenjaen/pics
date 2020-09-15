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
		Map<String, String> map = new HashMap();
		List<Map<String, String>> list  = new ArrayList<>();
		map.put("custId", "20");
		map.put("stuName", "베어");
		map.put("comId", "1234@admin.com");
		map.put("custName", "Yeonhee");
		map.put("stuId", "1130");
//		list = sqlSession.selectList(ns+"getRecentChatByStuName", map);
//		System.out.println(list);
//		list = sqlSession.selectList(ns+"getRecentChatByCustName", map);
//		System.out.println(list);
		list = sqlSession.selectList(ns+"getRecentChatByStuIdAndCustName", map);
		System.out.println(list);
	}
}
