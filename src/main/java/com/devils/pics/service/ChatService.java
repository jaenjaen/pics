package com.devils.pics.service;

import java.util.List;
import java.util.Map;

import com.devils.pics.domain.Chat;

public interface ChatService {
	/* 채팅 추가하기 */
	public int addChat(Chat chat) throws Exception;
	
	/* 채팅 아이디로 해당되는 대화를 삭제함 */
	public int deleteChat(String chatId) throws Exception;
	
	/* 읽음 처리(고객은 sender=1을 읽음 / 업체는 sender=0을 읽음) */
	public int setAlreadyRead(Map map) throws Exception;
	
	/* 읽지 않은 메세지를 가져옴(고객은 sender=1을 가져옴 / 업체는 sender=0을 가져옴) */
	public List<Chat> getNotYetRead(Map map) throws Exception;
	
	/* 읽지 않은 메세지의 개수를 가져옴 */
	public int countNotYetRead(Map map) throws Exception;
	
	/* 업체의 comId, stuId, custId, 안 읽은 채팅 개수, 날짜를 가져옴 */
	public List<Map> getCountOfUnreadComChat(String comId) throws Exception;
	
	/* 고객의 stuId, custId, 안 읽은 채팅 개수, 날짜를 가져옴 */
	public List<Map> getCountOfUnreadCustChat(String custId) throws Exception;
	
	/* 채팅 아이디로 대화를 가져옴 */
	public Chat getChatByChatId(String chatId) throws Exception;
	
	/* 해당되는 스튜디오, 고객의 대화를 가져옴 */
	public List<Chat> getPrevAllChat(Map map) throws Exception;
	
	/* 해당 스튜디오, 고객의 가장 최근 채팅 가져오기  */
	public Chat getMostRecentChat(Map map) throws Exception;
	
	/* 업체의 스튜디오 및 고객별 최근 대화  */
	public List<Map<String, String>> getRecentComChat(String comId) throws Exception;

	/* 업체의 스튜디오 및 고객별 최근 대화를 중복 없이 가져옴(스튜디오 이름순) */
	public List<Map<String, String>> getRecentComChatNoRpeat(String comId) throws Exception;
	
	/* 스튜디오의 고객별 최근 대화  */
	public List<Map<String, String>> getRecentStuChat(String stuId) throws Exception;
	
	/* 고객의 스튜디오별 최근 대화  */
	public List<Map<String, String>> getRecentCustChat(String custId) throws Exception;
	
	/* 스튜디오 아이디와 고객 이름으로 검색한, 업체의 스튜디오별/고객별 최근 대화   */
	public List<Map<String, String>> getRecentChatByStuIdAndCustName(Map map) throws Exception;
	
	/* 고객 이름으로 검색한, 업체의 스튜디오별/고객별 최근 대화  */
	public List<Map<String, String>> getRecentChatByCustName(Map map) throws Exception;
	
	/* 스튜디오 이름으로 검색한, 고객의 스튜디오별 최근 대화  */
	public List<Map<String, String>> getRecentChatByStuName(Map map) throws Exception;

	/* 고객 기본 정보(아이디, 이름, 프로필 사진) 가져오기 */
	public Map<String, String> getCustDefaultInfo(String custId) throws Exception;
	
	/* 스튜디오 기본 정보(스튜디오 아이디, 스튜디오 이름, 회사 아이디, 회사 이름, 회사 프로필 ) 가져오기*/
	public Map<String, String> getStuDefaultInfo(String stuId) throws Exception;
}
