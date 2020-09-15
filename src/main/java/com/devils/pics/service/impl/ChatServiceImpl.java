package com.devils.pics.service.impl;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.ChatDAO;
import com.devils.pics.domain.Chat;
import com.devils.pics.service.ChatService;

@Repository
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatDAO chatDao;
	
	
	/* 해당되는 스튜디오, 고객의 모든 대화를 가져옴 */
	@Override
	public List<Chat> getPrevAllChat(Map map) throws Exception {
		return chatDao.getPrevAllChat(map);
	}
	
	/* 업체의 스튜디오 및 고객별 최근 수신 대화  */
	@Override
	public List<Map<String, String>> getRecentComChat(String comId) throws Exception {
		return chatDao.getRecentComChat(comId);
	}
	
	/* 업체의 스튜디오 및 고객별 최근 수신 대화를 중복 없이 가져옴(스튜디오 이름순) */
	@Override
	public List<Map<String, String>> getRecentComChatNoRpeat(String comId) throws Exception {
		return chatDao.getRecentComChatNoRpeat(comId);
	}
	
	/* 스튜디오의 고객별 최근 수신 대화  */
	@Override
	public List<Map<String, String>> getRecentStuChat(String stuId) throws Exception {
		return chatDao.getRecentStuChat(stuId);
	}
	
	/* 고객의 스튜디오별 최근 수신 대화  */
	@Override
	public List<Map<String, String>> getRecentCustChat(String custId) throws Exception{
		return chatDao.getRecentCustChat(custId);
	}
	
	/* 스튜디오 아이디와 고객 이름으로 검색한, 업체의 스튜디오별/고객별 최근 수신 대화   */
	@Override
	public List<Map<String, String>> getRecentChatByStuIdAndCustName(Map map) throws Exception {
		return chatDao.getRecentChatByStuIdAndCustName(map);
	}
	
	/* 고객 이름으로 검색한, 업체의 스튜디오별/고객별 최근 수신 대화  */
	@Override
	public List<Map<String, String>> getRecentChatByCustName(Map map) throws Exception {
		return chatDao.getRecentChatByCustName(map);
	}
	
	/* 스튜디오 이름으로 검색한, 고객의 스튜디오별 최근 수신 대화  */
	@Override
	public List<Map<String, String>> getRecentChatByStuName(Map map) throws Exception {
		return chatDao.getRecentChatByStuName(map);
	}
	
	/* 고객 기본 정보(아이디, 이름, 프로필 사진) 가져오기 */
	@Override
	public Map<String, String> getCustDefaultInfo(String custId) throws Exception {
		return chatDao.getCustDefaultInfo(custId);
	}

	/* 스튜디오 기본 정보(스튜디오 아이디, 스튜디오 이름, 회사 아이디, 회사 이름, 회사 프로필 ) 가져오기*/
	@Override
	public Map<String, String> getStuDefaultInfo(String stuId) throws Exception {
		return chatDao.getStuDefaultInfo(stuId);
	}
}
