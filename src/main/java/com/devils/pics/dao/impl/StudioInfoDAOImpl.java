package com.devils.pics.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.devils.pics.dao.StudioInfoDAO;
import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Category;
import com.devils.pics.domain.Customer;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.Tag;

@Repository
public class StudioInfoDAOImpl implements StudioInfoDAO {

	@Autowired
	private SqlSession sqlSession;
	private final String NS = "StudioInfoMapper.";
	
	@Override
	public List<Studio> getStudioInfo(int stuId) {
		return sqlSession.selectList(NS+"getStudioInfo", stuId);
	}
		
	@Override
	public int getAccCustomer(int stuId) {
		return sqlSession.selectOne(NS+"getAccCustomer", stuId);
	}
	
	@Override
	public List<Review> getStudioReviews(int stuId) {
		return sqlSession.selectList(NS+"getStudioReviews",stuId);
	}
	
	
	/* 스튜디오 공간 등록 관련 메소드 */
	@Override
	public int registerStudioInfo(Studio studio) {
		//Studio 등록
		return sqlSession.insert(NS+"registerStudioInfo", studio);
	}
	@Override
	public int registerTag(Tag tag) {
		return sqlSession.insert(NS+"registerTag", tag);
	}
	@Override
	public List<Category> getCategory() {
		//카테고리 이름으로 Studio에 등록할 category_id(select value값으로 대체 가능할 듯)
		return sqlSession.selectList(NS+"getCategory");
	}
	@Override 
	public int getStudioId(Studio studio) {
		//Studio 등록 후 StudioFilter에 넣을 stu_id(autoIncrement)를 찾아옴
		return sqlSession.selectOne(NS+"getStudioId", studio);
	}
	@Override
	public List<Studio> getStudioByNameAndComId(Studio studio) {
		//name과 comId로 Studio를 가져옴
		return sqlSession.selectList(NS+"getStudioByNameAndComId", studio);
	}
	@Override
	public List<Studio> getStudioByAddrAndComId(Map map) {
		//address와 comId로 Studio를 가져옴
		return sqlSession.selectList(NS+"getStudioByAddrAndComId", map);
	}
	
	@Override
	public List<Tag> getTags(int stuId) {
		return sqlSession.selectList(NS+"getTags", stuId);
	}

	@Override
	public int getBookmark(List<Integer> idList) {
		return sqlSession.selectOne(NS+"getBookmark",idList);
	}

	@Override
	public List<Customer> genderRatio(int stuId) {
		return sqlSession.selectList(NS+"genderRatio",stuId);
	}

	@Override
	public int addBookmark(Bookmark bookmark) {
		return sqlSession.insert(NS+"addBookmark",bookmark);
	}

}
