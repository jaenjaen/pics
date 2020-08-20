package com.devils.pics.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.StudioInfoDAO;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;

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
	public List<Review> getReviews(List<Integer> idList) {
		return sqlSession.selectList(NS+"getStudioReview",idList);
	}

}
