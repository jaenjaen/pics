package com.devils.pics.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.ScheduleDAO;
import com.devils.pics.domain.RepeatDate;

@Repository
public class ScheduleDAOImpl implements ScheduleDAO {
	
	@Autowired
	private SqlSession sqlSession;
	private final String NS = "ScheduleMapper.";
	
	/* 스튜디오 공간 등록 관련 메소드 */
	@Override
	public int registerRepeatDate(RepeatDate repeatDate) {
		//RepeatDate 등록
		return sqlSession.insert(NS+"registerRepeatDate", repeatDate);
	}

	/* studio Id로 RepeatDate 가져오기*/
	@Override
	public List<RepeatDate> getRepeatDateByStuId(int stuId) throws Exception {
		return sqlSession.selectList(NS+"getRepeatDateByStuId",stuId);
	}

	/* RepeatDate 업데이트*/
	@Override
	public int updateRepeatDate(RepeatDate repeatDate) throws Exception {
		return sqlSession.update(NS+"updateRepeatDate",repeatDate);
	}
	
	/* RepeatDate 삭제*/
	@Override
	public int deleteRepeatDate(int repeatId) throws Exception {
		return sqlSession.delete(NS+"deleteRepeatDate",repeatId);
	}
}
