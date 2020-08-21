package com.devils.pics.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.StudioInfoDAO;
import com.devils.pics.domain.Category;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.Tag;

@Repository
public class StudioInfoDAOImpl implements StudioInfoDAO {

	@Autowired
	private SqlSession sqlSession;
	private final String NS = "StudioInfoMapper.";
	
	@Override
	public List<Studio> getStudioInfo(int stdId) {
		return sqlSession.selectList(NS+"getStudioInfo", stdId);
	}
		
	@Override
	public int getAccCustomer(int stdId) {
		return sqlSession.selectOne(NS+"getAccCustomer", stdId);
	}
	
	@Override
	public List<Review> getStudioReviews(int stdId) {
		return sqlSession.selectList(NS+"getStudioReviews",stdId);
	}
	
	
	/* 스튜디오 공간 등록 관련 메소드 */
	@Override
	public int getCategoryId(Category category) {
		//카테고리 이름으로 Studio에 등록할 category_id(select value값으로 대체 가능할 듯)
		return sqlSession.selectOne(NS+"getCategoryId", category);
	}
	@Override
	public int registerStudioInfo(Studio studio) {
		//Studio 등록
		return sqlSession.insert(NS+"registerStudioInfo", studio);
	}
	@Override
	public int getStudioId(Studio studio) {
		//Studio 등록 후 StudioFilter에 넣을 stu_id(autoIncrement)를 찾아옴
		return sqlSession.selectOne(NS+"getStudioId", studio);
	}

	@Override
	public Tag getTags(int stdId) {
		return sqlSession.selectOne(NS+"getTags", stdId);
	}

	@Override
	public int checkBookmark(List<Integer> idList) {
		return sqlSession.selectOne(NS+"checkBookmark",idList);
	}

}
