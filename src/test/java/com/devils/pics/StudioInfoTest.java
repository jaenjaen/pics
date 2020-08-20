package com.devils.pics;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Category;
import com.devils.pics.domain.Studio;

@SpringBootTest
class StudioInfoTest {

	@Autowired
	  private SqlSession sqlSession;
	
	@Test

	void contextLoads() {
		String NS = "StudioInfoMapper.";
		System.out.println("====================getStudioInfo====================");
		Studio vo=sqlSession.selectOne(NS+"getStudioInfo",1);
		System.out.println(vo);
		
		System.out.println("==================== getStudioFilter ====================");
		vo=sqlSession.selectOne(NS+"getStudioInfo",1);
		System.out.println(vo);

		
	}

	public void getCategoryId() {
		Category category = new Category(100, "카페");
		int categoryId = sqlSession.selectOne("StudioInfoMapper.getCategoryId", category);
		System.out.println("카테고리 아이디 : "+categoryId);
	}	


}
