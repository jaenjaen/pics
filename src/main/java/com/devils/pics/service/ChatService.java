package com.devils.pics.service;

import java.util.List;
import java.util.Map;

import com.devils.pics.domain.Chat;

public interface ChatService {
	/* 채팅 추가하기 */
	public int addChat(Chat chat) throws Exception;
	
	/* 해당되는 스튜디오, 고객의 대화를 가져옴 */
	public List<Chat> getPrevAllChat(Map map) throws Exception;
	
	/* 해당 스튜디오, 고객의 가장 최근 채팅 가져오기  */
	public Chat getMostRecentChat(Map map) throws Exception;
	
	/* 업체의 스튜디오 및 고객별 최근 수신 대화  */
	public List<Map<String, String>> getRecentComChat(String comId) throws Exception;

	/* 업체의 스튜디오 및 고객별 최근 수신 대화를 중복 없이 가져옴(스튜디오 이름순) */
	public List<Map<String, String>> getRecentComChatNoRpeat(String comId) throws Exception;
	
	/* 스튜디오의 고객별 최근 수신 대화  */
	public List<Map<String, String>> getRecentStuChat(String stuId) throws Exception;
	
	/* 고객의 스튜디오별 최근 수신 대화  */
	public List<Map<String, String>> getRecentCustChat(String custId) throws Exception;
	
	/* 스튜디오 아이디와 고객 이름으로 검색한, 업체의 스튜디오별/고객별 최근 수신 대화   */
	public List<Map<String, String>> getRecentChatByStuIdAndCustName(Map map) throws Exception;
	
	/* 고객 이름으로 검색한, 업체의 스튜디오별/고객별 최근 수신 대화  */
	public List<Map<String, String>> getRecentChatByCustName(Map map) throws Exception;
	
	/* 스튜디오 이름으로 검색한, 고객의 스튜디오별 최근 수신 대화  */
	public List<Map<String, String>> getRecentChatByStuName(Map map) throws Exception;

	/* 고객 기본 정보(아이디, 이름, 프로필 사진) 가져오기 */
	public Map<String, String> getCustDefaultInfo(String custId) throws Exception;
	
	/* 스튜디오 기본 정보(스튜디오 아이디, 스튜디오 이름, 회사 아이디, 회사 이름, 회사 프로필 ) 가져오기*/
	public Map<String, String> getStuDefaultInfo(String stuId) throws Exception;
}
