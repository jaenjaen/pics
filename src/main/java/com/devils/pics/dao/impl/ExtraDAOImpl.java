package com.devils.pics.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.ExtraDAO;
import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Studio;

@Repository
public class ExtraDAOImpl implements ExtraDAO {
	
	@Autowired
	private SqlSession sqlSession;
	private final String NS = "ExtraMapper.";
	
	@Override
	public int addBookmark(Bookmark bookmark) throws Exception {
		return sqlSession.insert(NS+"addBookmark",bookmark);
	}
	@Override
	public List<Studio> getBookmark(int custId) throws Exception {
		return sqlSession.selectList(NS+"getBookmark",custId);
	}
	@Override
	public int deleteBookmark(int bookId) throws Exception {
		return sqlSession.delete(NS+"deleteBookmark",bookId);
	}
}
