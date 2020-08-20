package com.devils.pics;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Category;
import com.devils.pics.domain.Company;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Schedule;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.service.StudioInfoService;

@SpringBootTest
class StudioInfoTest {

	@Autowired
	  private SqlSession sqlSession;
	@Autowired
	private StudioInfoService service;
	
	@Test
	void contextLoads() {
		String NS = "StudioInfoMapper.";
//		System.out.println("====================getStudioInfo====================");
//		Studio studioVO=sqlSession.selectOne(NS+"getStudioInfo",1);
//		System.out.println(studioVO);
		
//		System.out.println("==================== getStudioFilter ====================");
//		Company companyVO=sqlSession.selectOne(NS+"getCompany",1);
//		String categoryVO=sqlSession.selectOne(NS+"getStudioInfo",1);
//		studioVO vo=new Studio(stdId, comId, categoryId, name, description, rule, filterId,
//				mainImg, portImg, cadImg, floor, StudioFilter studioFilter, Company company,
//				Category category, Schedule schedule)
//		System.out.println(companyVO);

//		ArrayList<Integer> idList=new ArrayList<Integer>();
//		idList.add(1);
//		idList.add(1);
//		List<Review> reviewVO=sqlSession.selectList(NS+"getStudioReview",idList);
//		System.out.println(reviewVO);
		
//		int cnt=sqlSession.selectOne(NS+"getAccCustomer",1);
//		System.out.println(cnt);
		
		
		System.out.println(service.getAccCustomer(1));
		
		
	}

}
