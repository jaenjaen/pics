package com.devils.pics.service.impl;

import java.awt.print.Book;
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
		System.out.println("첫 리스트 : " + list);
		Bookmark b = new Bookmark();
		b.setCustId(searchCon.getCustId());
		if (searchCon.getCustId() != -1) {
			for (Studio std : list) {
				b.setStuId(std.getStuId());
				if (checkBookMark(b) != null && std.getStuId() == checkBookMark(b).getStuId()) {
					System.out.println(3);
					ArrayList<Bookmark> bmList = new ArrayList<Bookmark>();
					bmList.add(checkBookMark(b));
					std.setBookmark(bmList);
				}
			}
		}
		return list;
	}
	
	@Transactional
	@Override
	public Bookmark checkBookMark(Bookmark bm) {
		return studioFilterDao.checkBookMark(bm);
	}
}
