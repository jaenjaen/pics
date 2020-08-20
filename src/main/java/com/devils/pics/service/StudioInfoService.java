package com.devils.pics.service;

import java.util.List;

import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;

public interface StudioInfoService {
	public List<Studio> getStudioInfo(int stdId); // Studio DAO에 있는 스튜디오 기본 정보 조회
	public int getAccCustomer(int stdId); 	//누적 이용자수 조회
	public List<Review> getReviews(List<Integer> idList); //스튜디오에 등록된 모든 리뷰

}
