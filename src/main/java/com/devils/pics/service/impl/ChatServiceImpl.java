package com.devils.pics.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.ChatDAO;
import com.devils.pics.service.ChatService;

@Repository
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatDAO chatDao;
	
	/* 업체의 스튜디오 및 고객별 최근 수신 대화  */
	@Override
	public List<Map<String, String>> getRecentComChat(String comId) throws Exception {
		return chatDao.getRecentComChat(comId);
	}

}
