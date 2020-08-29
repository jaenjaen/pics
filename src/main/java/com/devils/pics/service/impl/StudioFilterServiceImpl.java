package com.devils.pics.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.StudioFilterDAO;
import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.service.StudioFilterService;
import com.devils.pics.util.SearchCon;

@Service
public class StudioFilterServiceImpl implements StudioFilterService {
	
	@Autowired
	private StudioFilterDAO studioFilterDao;

	/* 스튜디오 공간 등록 관련 메소드 */
	@Override
	public int registerStudioFilter(StudioFilter studioFilter) {
		//StudioFilter 등록
		return studioFilterDao.registerStudioFilter(studioFilter);
	}
	
	@Override
	public List<Studio> searchStudio() {
		return studioFilterDao.searchStudio();
	}

	@Override
	public List<Studio> searchStudio(SearchCon searchCon) {
		return studioFilterDao.searchStudio(searchCon);
	}
}
