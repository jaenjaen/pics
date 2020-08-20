package com.devils.pics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.StudioFilterDAO;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.service.StudioFilterService;

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
}
