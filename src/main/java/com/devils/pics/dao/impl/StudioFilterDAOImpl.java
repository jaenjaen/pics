package com.devils.pics.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.StudioFilterDAO;
import com.devils.pics.domain.StudioFilter;

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
	
}
