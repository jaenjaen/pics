package com.devils.pics.service.impl;

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
	
	/* 고객의 스튜디오별 최근 수신 대화  */
	public List<Map<String, String>> getRecentCustChat(String custId) throws Exception{
		return chatDao.getRecentCustChat(custId);
	}
	
	/* RecentComChat에서 현재 대화 중인 고객 인덱스 뽑아오기 */
	public int getPresentCustIndex(String comId, String custId) throws Exception {
		int index = -1;
		List<Map<String, String>> list = getRecentComChat(comId);
		for(int i=0; i<list.size(); i++) {
			if(list.get(i).get("custId").equals(custId)) {
				index = i;
			}
		}
		return index;
	}
	
	/* RecentCustChat에서 현재 대화 중인 스튜디오 인덱스 뽑아오기 */
	public int getPresentStuIndex(String custId, String stuId) throws Exception {
		int index = -1;
		List<Map<String, String>> list = getRecentCustChat(custId);
		for(int i=0; i<list.size(); i++) {
			if(list.get(i).get("stuId").equals(stuId)) {
				index = i;
			}
		}
		return index;
	}
}
