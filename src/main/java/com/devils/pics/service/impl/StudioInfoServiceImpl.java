package com.devils.pics.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.StudioInfoDAO;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;
import com.devils.pics.service.StudioInfoService;

@Service
public class StudioInfoServiceImpl implements StudioInfoService {	
	@Autowired
	private StudioInfoDAO studioInfoDao;

	@Override
	public List<Studio> getStudioInfo(int stdId) {
		return studioInfoDao.getStudioInfo(stdId);
	}

	@Override
	public int getAccCustomer(int stdId) {
		return studioInfoDao.getAccCustomer(stdId);
	}

	@Override
	public List<Review> getReviews(List<Integer> idList) {
		return studioInfoDao.getReviews(idList);
	}
}
