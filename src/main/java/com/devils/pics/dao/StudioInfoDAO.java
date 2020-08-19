package com.devils.pics.dao;

import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;

public interface StudioInfoDAO {
	public Studio getStudioInfo(int stdId); // Studio DAO 에 있는 스튜디오 기본 정보 조회
	public int checkBookmark(int stdId, int custId); //찜했는지 여부 판단
	public int getAccCustomer(int stdId);	//누적 이용자수 조회
	public Review getReviews(int stdId);	//스튜디오에 등록된 모든 리뷰, 평점
	
}
