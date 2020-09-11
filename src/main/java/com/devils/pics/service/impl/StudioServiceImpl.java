package com.devils.pics.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.StudioDAO;
import com.devils.pics.domain.Studio;
import com.devils.pics.service.StudioService;

@Service
public class StudioServiceImpl implements StudioService{
	
	@Autowired
	private StudioDAO studioDao;

	@Override
	public List<Studio> getStudiosBycomId(String comId) throws Exception {
		return studioDao.getStudiosBycomId(comId);
	}

	@Override
	public int deleteStudio(int stuId) throws Exception {
		return studioDao.deleteStudio(stuId);
	}

}
