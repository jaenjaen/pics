package com.devils.pics.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.devils.pics.dao.StudioInfoDAO;
import com.devils.pics.domain.Category;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.Tag;
import com.devils.pics.service.StudioInfoService;

@Service
public class StudioInfoServiceImpl implements StudioInfoService {	
	@Autowired
	private StudioInfoDAO studioInfoDao;

	/* 스튜디오 공간 등록 관련 메소드 */
	@Override
	public int getCategoryId(Category category) {
		//카테고리 이름으로 Studio에 등록할 category_id(select value값으로 대체 가능할 듯)
		return studioInfoDao.getCategoryId(category);
	}

	@Override
	public int registerStudioInfo(Studio studio) {
		//Studio 등록
		return studioInfoDao.registerStudioInfo(studio);
	}

	@Override
	public int getStudioId(Studio studio) {
		//Studio 등록 후 StudioFilter에 넣을 stu_id(autoIncrement)를 찾아옴
		return studioInfoDao.getStudioId(studio);
	}
	@Override
	public List<Studio> getStudioInfo(int stdId) {
		return studioInfoDao.getStudioInfo(stdId);
	}

	@Override
	public int getAccCustomer(int stdId) {
		return studioInfoDao.getAccCustomer(stdId);
	}

	@Override
	public List<Review> getStudioReviews(int stdId) {
		return studioInfoDao.getStudioReviews(stdId);

	}

	@Override
	public Tag getTags(int stdId) {
		return studioInfoDao.getTags(stdId);
	}

	@Override
	public int checkBookmark(List<Integer> idList) {
		return studioInfoDao.checkBookmark(idList);
	}
}
