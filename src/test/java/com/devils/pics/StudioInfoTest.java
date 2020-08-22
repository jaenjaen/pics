package com.devils.pics;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Category;
import com.devils.pics.domain.Company;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Schedule;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.domain.Tag;
import com.devils.pics.service.StudioInfoService;

@SpringBootTest
class StudioInfoTest {

	@Autowired
	  private SqlSession sqlSession;
	@Autowired
	private StudioInfoService service;
	
//	public Studio getSample() {
//		Studio studio = new Studio();
//		studio.setComId("com1@gmail.com");
//		studio.setCategoryId(1);
//		studio.setName("짱조은카페");
//		studio.setDescription("설명~~");
//		studio.setRule("규칙");
//		studio.setMainImg("main.jpg");
//		studio.setPortImg("port.jpg");
//		studio.setCadImg("cad.jpg");
//		studio.setFloor(5);
//		return studio;
//	}
	
	/* Studio 등록 - 단위 테스트 성공 */
//	@Test
//	public void registerStudioInfo() {
//		Studio studio = getSample();
//		int result = sqlSession.insert("StudioInfoMapper.registerStudioInfo", studio);
//		System.out.println("카테고리 아이디 : "+result);
//	}
//	
//	/* Studio로 Studio 아이디 찾아오기 - 단위 테스트 성공*/
//	@Test
//	public void getStudioId() {
//		Studio studio = getSample();
//		int stuId = sqlSession.selectOne("StudioInfoMapper.getStudioId", studio);
//		System.out.println("스튜디오 아이디 : "+stuId);
//	}

	/* 카테고리 이름으로 카테고리 아이디 찾아오기 - 단위 테스트 성공 */
	@Test
	/*public void getCategoryId() {
		Category category = new Category(100, "카페");
		int categoryId = sqlSession.selectOne("StudioInfoMapper.getCategoryId", category);
		System.out.println("카테고리 아이디 : "+categoryId);
	}*/	
	void contextLoads() {
		String NS = "StudioInfoMapper.";
//		System.out.println("====================getStudioInfo====================");
//		try {
//		List<Studio> studioVO=sqlSession.selectList(NS+"getStudioInfo",1);
//		System.out.println(studioVO);
//		}catch (NullPointerException e) {
//			e.getMessage();
//			System.out.println("찾으시는 스튜디오가 없습니다");
//		}
		
//		System.out.println("==================== getReview ====================");
//		try {
//		List<Review> reviewVO=sqlSession.selectList(NS+"getStudioReviews",10);
//		System.out.println(reviewVO);
//		}catch (NullPointerException e) {System.out.println("찾으시는 스튜디오가 없습니다");}

//		System.out.println("==================== getAccCustomer ====================");
//		try {
//		int cnt=sqlSession.selectOne(NS+"getAccCustomer",10);
//		System.out.println(cnt);
//		}catch (NullPointerException e) {System.out.println("이용 고객이 없는 스튜디오 입니다");}

//		System.out.println("==================== getBookmark ====================");
//		try {
			List<Integer> idList=new ArrayList<Integer>();
			idList.add(1);//cust_id
			idList.add(12);//stu_id
//
//			int cnt=sqlSession.selectOne(NS+"getBookmark",idList);
//			System.out.println(cnt+","+idList.get(0)+","+idList.get(1));
//		}catch (NullPointerException e) {e.getMessage();}
//
//		
//		System.out.println("==================== DAO & Service Test ====================");
//		System.out.println("==================== getAccCustomer ====================");
//		try {
//		System.out.println(service.getAccCustomer(1));
//		}catch (NullPointerException e) {System.out.println("이용 고객이 없는 스튜디오 입니다");}
//		
//		System.out.println("==================== getReview ====================");
//		try {
//			List<Review> reviewVO=service.getStudioReviews(idList);
//		}catch (NullPointerException e) {System.out.println("이용 고객이 없는 스튜디오 입니다");}
//		
//		System.out.println("==================== getTags ====================");
//		try {
//			Tag tagVO=service.getTags(1);
//		}catch (NullPointerException e) {System.out.println("태그가...없나?");}

		System.out.println("==================== getBookmark ====================");
		try {
			int vo=service.checkBookmark(idList);
			System.out.println("vo : "+vo);
		}catch (NullPointerException e) {System.out.println("태그가...없나?");}

	}

}
