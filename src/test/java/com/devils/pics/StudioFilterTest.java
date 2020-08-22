package com.devils.pics;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Category;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;

@SpringBootTest
public class StudioFilterTest {

	@Autowired
	private SqlSession sqlSession;

	/* StudioFilter 등록 - 단위 테스트 성공 */
	@Test
	public void registerStudioFilter() {
		StudioFilter studioFilter = new StudioFilter(); 
		studioFilter.setSize(120);
		studioFilter.setOptions("카메라/조명/포토그래퍼"); 
		studioFilter.setParking(4);
		studioFilter.setUnitPrice(37000); 
		studioFilter.setDefaultCapacity(3);
		studioFilter.setMaxCapacity(5);
		studioFilter.setExcharge(5000); 
		studioFilter.setAddress("서울특별시 서초구 효령로 335");
		System.out.println(studioFilter);
		/*
		sqlSession.insert("StudioFilterMapper.registerStudioFilter", studioFilter);
		*/
		
		//sqlSession.insert("StudioFilterMapper.registerStudioFilter", studioFilter);
		
		//========== 검색 결과 (필터 포함, 검색어) ================
		/*
		 * Studio studio = new Studio(); Category category = new Category();
		 * StudioFilter filter = new StudioFilter();
		 * 
		 * category.setCategoryId(1); //카테고리 별 filter.set studio.setCategory(category);
		 */
		HashMap<String, String> filterMap = new HashMap<String, String>();
//		filterMap.put("categoryId", "1");
//		filterMap.put("weekDate","월");
//		filterMap.put("selectedDate","2020-08-13");
//		filterMap.put("address","서울시 ");
//		filterMap.put("minSize", "100");
//		filterMap.put("maxSize", "150");
//		filterMap.put("minUnitPrice", "10000");
//		filterMap.put("maxUnitPrice", "15000");
//		filterMap.put("capacity", "15")`;
//		filterMap.put("studioName", "15");
//		filterMap.put("searchContent", "카페");
//		filterMap.put("searchTag", "모던");
		filterMap.put("orderCon", "4");
		
		List<Studio> list = sqlSession.selectList("StudioFilterMapper.selectStudioByFilter", filterMap);
		System.out.println("조회된 총 studio 수 : " + list.size());
		for (Studio s : list) System.out.println(s);

	}
}
