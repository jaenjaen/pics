package com.devils.pics.dao;

import java.util.List;
import java.util.Map;

public interface ChatDAO {
	/* 업체의 스튜디오 및 고객별 최근 수신 대화  */
	public List<Map<String, String>> getRecentComChat(String comId) throws Exception;
	
	/* 고객의 스튜디오별 최근 수신 대화  */
	public List<Map<String, String>> getRecentCustChat(String custId) throws Exception;
}
