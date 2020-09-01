package com.devils.pics.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.StudioFilterDAO;
import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.util.SearchCon;

@Repository
public class StudioFilterDAOImpl implements StudioFilterDAO {

	@Autowired
	private SqlSession sqlSession;
	private final String NS = "StudioFilterMapper.";
	
	/* 스튜디오 공간 등록 관련 메소드 */
	@Override
	public int registerStudioFilter(StudioFilter studioFilter) {
		//StudioFilter 등록
		return sqlSession.insert(NS+"registerStudioFilter", studioFilter);
	}
	
	// 필터 출력
	@Override
	public List<Studio> searchStudio(SearchCon searchCon) {
		//Studio 검색
		return sqlSession.selectList(NS+"selectStudioByFilter", searchCon);
	}
	
	// 전체 출력
	@Override
	public List<Studio> searchStudio() {
		return sqlSession.selectList(NS+"selectStudios");
	}
	
	// 찜여부 확인
	@Override
	public List<Bookmark> checkBookMark(int custId) {
		return sqlSession.selectList(NS+"checkBookMark",custId);
	}
}
