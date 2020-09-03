package com.devils.pics.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.devils.pics.dao.StudioInfoDAO;
import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Category;
import com.devils.pics.domain.Customer;
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
	public List<Category> getCategory() {
		//카테고리 이름으로 Studio에 등록할 category_id(select value값으로 대체 가능할 듯)
		return studioInfoDao.getCategory();
	}

	@Override
	public int registerStudioInfo(Studio studio) {
		//Studio 등록
		return studioInfoDao.registerStudioInfo(studio);
	}

	@Override
	public int registerTag(Tag tag) {
		//Tag 등록
		return studioInfoDao.registerTag(tag);
	}
	
	@Override
	public boolean isExistStudio(Studio studio) {
		/* 중복 등록을 막기 위해 DB상에 이미 존재하는 스튜디오인지 검사함 */
		Studio studio1 = studioInfoDao.getStudioByNameAndComId(studio); //name과 comId로 찾음
		Studio studio2 = studioInfoDao.getStudioByAddrAndComId(studio); //address와 comId로 찾음
		if(studio1 == null && studio2 == null) { //이미 존재하는 스튜디오가 아니라면
			return false;
		}else { //이미 존재하는 스튜디오라면
			return true;
		}
	}
	
	@Override
	public int getStudioId(Studio studio) {
		/* Studio 등록 후 StudioFilter에 넣을 stu_id(autoIncrement)를 찾아옴 */
		return studioInfoDao.getStudioId(studio);
	}
	
	@Override
	public List<Studio> getStudioInfo(int stuId) {
		return studioInfoDao.getStudioInfo(stuId);
	}

	@Override
	public int getAccCustomer(int stuId) {
		return studioInfoDao.getAccCustomer(stuId);
	}

	@Override
	public List<Review> getStudioReviews(int stuId) {
		return studioInfoDao.getStudioReviews(stuId);

	}

	@Override
	public List<Tag> getTags(int stuId) {
		return studioInfoDao.getTags(stuId);
	}

	@Override
	public int getBookmark(List<Integer> idList) {
		return studioInfoDao.getBookmark(idList);
	}

	@Override
	public List<Customer> genderRatio(int stuId) {
		return studioInfoDao.genderRatio(stuId);
	}

	@Override
	public int addBookmark(Bookmark bookmark) {
		return studioInfoDao.addBookmark(bookmark);
	}
}
