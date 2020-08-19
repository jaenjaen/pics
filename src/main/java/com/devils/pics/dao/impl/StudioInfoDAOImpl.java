package com.devils.pics.dao.impl;

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
	public Studio getStudioInfo(int stdId) {
		
		return null;
	}
	
	@Override
	public int checkBookmark(int stdId, int custId) {
		
		return 0;
	}
	
	@Override
	public int getAccCustomer(int stdId) {

		return 0;
	}
	
	@Override
	public Review getReviews(int stdId) {
		
		return null;
	}

}
