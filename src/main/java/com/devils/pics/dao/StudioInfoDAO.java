package com.devils.pics.dao;

import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Category;
import com.devils.pics.domain.Customer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.Tag;

public interface StudioInfoDAO {
	/* 스튜디오 공간 등록 관련 메소드 */
	public int registerStudioInfo(Studio studio); //Studio 등록
	public int registerTag(Tag tag); //Tag 등록
	public List<Category> getCategory(); //카테고리를 가져옴
	public int getStudioId(Studio studio);//Studio 등록 후 StudioFilter에 넣을 stu_id(autoIncrement)를 찾아옴
	public List<Studio> getStudioByNameAndComId(Studio studio); //name, comId로 Studio를 찾아옴
	public List<Studio> getStudioByAddrAndComId(Map map); //addr, comId로 Studio를 찾아옴
	public int updateTag(Tag tag);
	
	// 스튜디오 상세조회	
	public List<Studio> getStudioInfo(int stuId); // Studio DAO에 있는 스튜디오 기본 정보 조회
	public int getAccCustomer(int stuId); 	//누적 이용자수 조회
	public List<Review> getStudioReviews(int stuId); //스튜디오에 등록된 모든 리뷰
	public List<Tag> getTags(int stuId); //tag 가져오기
	public int getBookmark(List<Integer> idList); //tag 가져오기
	public int addBookmark(Bookmark bookmark); //tag 추가
	
	// 스튜디오 chart & graph
	public List<Customer> genderRatio(int stuId);

}
