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

	
	/* comId로 스튜디오 목록 받아오기*/
	@Override
	public List<Studio> getStudiosBycomId(String comId) throws Exception {
		return studioDao.getStudiosBycomId(comId);
	}
	
	/*stuId로 스튜디오 정보 받아오기*/
	@Override
	public Studio getStudio(int stuId) throws Exception {
		return studioDao.getStudio(stuId);
	}
	
	/* 스튜디오 삭제 */
	@Override
	public int deleteStudio(int stuId) throws Exception {
		return studioDao.deleteStudio(stuId);
	}

	

}
