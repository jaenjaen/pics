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
	public int AddReservation(Reservation reservation) {
		return sqlSession.insert(NS+"addReservation", reservation);
	}

	@Override
	public int AddExceptionDates(Reservation reservation) {
		return sqlSession.insert(NS+"addExceptionDates", reservation);
	}

	@Override
	public List<Reservation> getReservation(Reservation reservation) {
		return sqlSession.selectList(NS+"getReservation", reservation);
	}

	@Override
	public int UpdateReservation(Reservation reservation) {
		return sqlSession.update(NS+"updateReservation", reservation);
	}

	@Override
	public int UpdateExceptionDate(Reservation reservation) {
		// TODO Auto-generated method stub
		return sqlSession.update(NS+"updateExceptionDate", reservation);
	}

	@Override
	public int DeleteReservations(List<Reservation> reservationList) {
		return sqlSession.delete(NS+"deleteReservations", reservationList);
	}

	@Override
	public int DeleteExceptionDates(List<Reservation> reservationList) {
		return sqlSession.delete(NS+"deleteExceptionDates", reservationList);
	}

	@Override
	public List<Reservation> getExpiredReservation(int custId) {
		return sqlSession.selectList(NS+"getExpiredReservation", custId);
	}

	@Override
	public List<Reservation> getWillReservation(int custId) {
		return sqlSession.selectList(NS+"geWillReservation", custId);
	}

}
