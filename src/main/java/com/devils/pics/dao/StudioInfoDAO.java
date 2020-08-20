package com.devils.pics.dao;

import com.devils.pics.domain.Category;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;

public interface StudioInfoDAO {
	public Studio getStudioInfo(int stdId); // Studio DAO 에 있는 스튜디오 기본 정보 조회
	public int checkBookmark(int stdId, int custId); //찜했는지 여부 판단
	public int getAccCustomer(int stdId);	//누적 이용자수 조회
	public Review getReviews(int stdId);	//스튜디오에 등록된 모든 리뷰, 평점
	
	/* 스튜디오 공간 등록 관련 메소드 */
	public int getCategoryId(Category category); //카테고리 이름으로 Studio에 등록할 category_id(select value값으로 대체 가능할 듯)
	public int registerStudioInfo(Studio studio); //Studio 등록
	public int getStudioId(Studio studio); //Studio 등록 후 StudioFilter에 넣을 stu_id(autoIncrement)를 찾아옴
	
}
