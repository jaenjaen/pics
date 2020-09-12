package com.devils.pics.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.ExtraDAO;
import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;
import com.devils.pics.service.ExtraService;

@Service
public class ExtraServiceImpl implements ExtraService {

	@Autowired
	private ExtraDAO extraDao;

	@Override
	public int addBookmark(Bookmark bookmark) throws Exception {
		return extraDao.addBookmark(bookmark);
	}

	@Override
	public List<Studio> getBookmark(int custId) throws Exception {
		return extraDao.getBookmark(custId);
	}
	
	@Override
	public Bookmark getBookId(HashMap<String, Integer> ids) throws Exception {
		return extraDao.getBookId(ids);
	}

	@Override
	public int deleteBookmark(int bookId) throws Exception {
		return extraDao.deleteBookmark(bookId);
	}

	@Override
	public int writeReview(Review review) throws Exception {
		return extraDao.writeReview(review);
	}

	@Override
	public List<Review> getCustomerReivews(int custId) throws Exception {
		return extraDao.getCustomerReivews(custId);
	}

	@Override
	public int checkReviews(int resId) throws Exception {
		return extraDao.checkReviews(resId);
	}

	@Override
	public int deleteReview(int reviewId) throws Exception {
		return extraDao.deleteReview(reviewId);
	}

	@Override
	public List<Studio> getBookmarkList(int custId) throws Exception {
		List<Studio> list = extraDao.getBookmarkList(custId);
		
		for(Studio std : list) {
			String oneMainImg =std.getMainImg().split(",")[0];
			std.setMainImg(oneMainImg);
			
			if(!oneMainImg.contains("jpg")) {
				String word1= std.getMainImg().concat(".jpg");
				std.setMainImg(word1);
			}
			if(oneMainImg.contains("/")){
				String word2= std.getMainImg().replace("/", "");
				std.setMainImg(word2);
			}
		}
		return list;
	}

	
}
