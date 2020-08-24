package com.devils.pics.dao.impl;

import java.util.ArrayList;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.devils.pics.dao.StudioReserveDAO;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Studio;

@Repository
public class StudioReserveDAOImpl implements StudioReserveDAO{
	@Autowired
	private SqlSession sqlSession;
	private final String NS = "StudioReserveMapper.";

	@Override
	public ArrayList<ExceptionDate> getExceptionDate(int stuId) {
		return (ArrayList) sqlSession.selectList(NS+"getExceptionDate", stuId);
	}

	@Override
	public ArrayList<RepeatDate> getRepeatDate(int stuId) {
		return (ArrayList) sqlSession.selectList(NS+"getRepeatDate", stuId);
	}

	@Override
	public int reserve(Reservation reservation) {
		return sqlSession.insert(NS+"reserve", reservation);
	}

	@Override
	public int AddexceptionDates(Reservation reservation) {
		return sqlSession.insert(NS+"AddexceptionDates", reservation);
	}

}
