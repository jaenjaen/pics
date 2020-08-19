package com.devils.pics.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.devils.pics.dao.ExtraDAO;

public class ExtraDAOImpl implements ExtraDAO {
	
	@Autowired
	private SqlSession sqlSession;
	private final String NS = "ExtraMapper.";
}
