package com.devils.pics.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.ChatDAO;
import com.devils.pics.domain.Chat;

@Repository
public class ChatDAOImpl implements ChatDAO {
	
	@Autowired
	private SqlSession sqlSession;
	private final String ns = "ChatMapper.";

	/* 해당되는 스튜디오, 고객의 대화를 가져옴 */
	public List<Chat> getPrevAllChat(Map map) throws Exception{
		return sqlSession.selectList(ns+"getPrevAllChat", map);
	}
	
	/* 업체의 스튜디오 및 고객별 최근 수신 대화  */
	@Override
	public List<Map<String, String>> getRecentComChat(String comId) throws Exception {
		return sqlSession.selectList(ns+"getRecentComChat", comId);
	}
	
	/* 고객의 스튜디오별 최근 수신 대화  */
	@Override
	public List<Map<String, String>> getRecentCustChat(String custId) throws Exception{
		return sqlSession.selectList(ns+"getRecentCustChat", custId);
	}

}
