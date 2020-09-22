package com.devils.pics.service;

import java.util.List;

import com.devils.pics.domain.Studio;

public interface StudioService {
	public List<Studio> getStudiosBycomId(String comId) throws Exception; //comId로 스튜디오리스트 가져오기
	public Studio getStudio (int stuId) throws Exception; // stuId로 스튜디오 가져오기
	int updateStudio (Studio studio) throws Exception; // studio update
	public int deleteStudio(int stuId) throws Exception; // 스튜디오 삭제
}
