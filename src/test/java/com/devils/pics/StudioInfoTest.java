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
	
	public Studio getSample() {
		Studio studio = new Studio();
		studio.setComId("com1@gmail.com");
		studio.setCategoryId(1);
		studio.setName("짱조은카페");
		studio.setDescription("설명~~");
		studio.setRule("규칙");
		studio.setMainImg("main.jpg");
		studio.setPortImg("port.jpg");
		studio.setCadImg("cad.jpg");
		studio.setFloor(5);
		return studio;
	}
	
	/* Studio 등록 - 단위 테스트 성공 */
	@Test
	public void registerStudioInfo() {
		Studio studio = getSample();
		int result = sqlSession.insert("StudioInfoMapper.registerStudioInfo", studio);
		System.out.println("카테고리 아이디 : "+result);
	}
	
	/* Studio로 Studio 아이디 찾아오기 - 단위 테스트 성공*/
	@Test
	public void getStudioId() {
		Studio studio = getSample();
		int stuId = sqlSession.selectOne("StudioInfoMapper.getStudioId", studio);
		System.out.println("스튜디오 아이디 : "+stuId);
	}

	/* 카테고리 이름으로 카테고리 아이디 찾아오기 - 단위 테스트 성공 */
	@Test
	public void getCategoryId() {
		Category category = new Category(100, "카페");
		int categoryId = sqlSession.selectOne("StudioInfoMapper.getCategoryId", category);
		System.out.println("카테고리 아이디 : "+categoryId);
	}	
}
