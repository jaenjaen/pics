package com.devils.pics.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.devils.pics.dao.StudioFilterDAO;

public class StudioFilterDAOImpl implements StudioFilterDAO {

	@Autowired
	private SqlSession sqlSession;
	private final String NS = "StudioFilterMapper.";
}
