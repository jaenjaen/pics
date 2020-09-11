package com.devils.pics.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.StudioDAO;
import com.devils.pics.domain.Studio;

@Repository
public class StudioDAOImpl implements StudioDAO {
	
	@Autowired
	private SqlSession sqlSession;
	
	private final String NS = "StudioMapper.";
	@Override
	public List<Studio> getStudiosBycomId(String comId) throws Exception {
		return sqlSession.selectList(NS+"getStudiosBycomId",comId);
	}
	@Override
	public int deleteStudio(int stuId) throws Exception {
		return sqlSession.delete(NS+"deleteStudio",stuId);
	}
	
		
}
