package com.devils.pics.dao;

import java.util.HashMap;
import java.util.List;

import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.util.SearchCon;

public interface StudioFilterDAO {
	
	/* 스튜디오 공간 등록 관련 메소드 */
	public int registerStudioFilter(StudioFilter studioFilter); //StudioFilter 등록
	public List<Studio> searchStudio(SearchCon searchCon); //Studio 검색
	public List<Studio> searchStudio();
	public List<Bookmark> checkBookMark(int custId);
}
