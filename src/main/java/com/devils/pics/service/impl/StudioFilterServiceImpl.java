package com.devils.pics.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	@Transactional
	@Override
	public List<Studio> searchStudio(SearchCon searchCon) {
		List<Studio> list = studioFilterDao.searchStudio(searchCon);
		ArrayList<Bookmark> bmList = new ArrayList<Bookmark>();
		for (Bookmark bm : checkBookMark(searchCon.getCustId())){
			for (Studio std : list){
				if(std.getStuId() == bm.getStuId()) {
					bmList.add(bm);
					std.setBookmark(bmList);
					break;
				}
			}
		}
		return list;
	}
	
	@Transactional
	@Override
	public List<Bookmark> checkBookMark(int custId) {
		return studioFilterDao.checkBookMark(custId);
	}
}
