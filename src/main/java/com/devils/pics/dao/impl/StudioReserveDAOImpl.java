package com.devils.pics.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.devils.pics.dao.StudioReserveDAO;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Schedule;
import com.devils.pics.domain.Studio;

@Repository
public class StudioReserveDAOImpl implements StudioReserveDAO{
	@Autowired
	private SqlSession sqlSession;
	private final String NS = "StudioReserveMapper.";

	@Override
	public ArrayList<ExceptionDate> getExceptionDate(Schedule schedule) {
		return (ArrayList) sqlSession.selectList(NS+"getExceptionDate", schedule);
	}

	@Override
	public ArrayList<RepeatDate> getRepeatDate(int stuId) {
		return (ArrayList) sqlSession.selectList(NS+"getRepeatDate", stuId);
	}

	@Override
	public int AddReservation(Reservation reservation) {
		return sqlSession.insert(NS+"addReservation", reservation);
	}

	@Override
	public int AddExceptionDates(ExceptionDate exception) {
		return sqlSession.insert(NS+"addExceptionDates", exception);
	}

	@Override
	public List<Reservation> getReservation(Schedule schedule) {
		return sqlSession.selectList(NS+"getReservation", schedule);
	}

	@Override
	public int UpdateReservation(Reservation reservation) {
		return sqlSession.update(NS+"updateReservation", reservation);
	}

	@Override
	public int UpdateExceptionDate(ExceptionDate exception) {
		// TODO Auto-generated method stub
		return sqlSession.update(NS+"updateExceptionDate", exception);
	}

	@Override
	public int DeleteReservation(int resId) {
		return sqlSession.delete(NS+"deleteReservation", resId);
	}

	@Override
	public int DeleteExceptionDate(int exceptionId) {
		return sqlSession.delete(NS+"deleteExceptionDates", exceptionId);
	}

	@Override
	public List<Reservation> getExpiredReservation(int custId) {
		return sqlSession.selectList(NS+"getExpiredReservation", custId);
	}

	@Override
	public List<Reservation> getWillReservation(int custId) {
		return sqlSession.selectList(NS+"getWillReservation", custId);
	}

	@Override
	public List<Reservation> getMonthReservation(Reservation reservation) {
		return sqlSession.selectList(NS+"getMonthReservation", reservation);
	}

	@Override
	public List<Reservation> getWillStudioReservation(int stuId) {
		return sqlSession.selectList(NS+"getWillStudioReservation", stuId);
	}

}
