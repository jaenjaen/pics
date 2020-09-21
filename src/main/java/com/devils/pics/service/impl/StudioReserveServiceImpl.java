package com.devils.pics.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.StudioReserveDAO;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Schedule;
import com.devils.pics.service.StudioReserveService;

@Service
public class StudioReserveServiceImpl implements StudioReserveService {	
	@Autowired
	private StudioReserveDAO studioReserveDAO;

	@Override
	public ArrayList<ExceptionDate> getExceptionDate(Schedule schedule) {
		return studioReserveDAO.getExceptionDate(schedule);

	}

	@Override
	public ArrayList<RepeatDate> getRepeatDate(int stuId) {
		return studioReserveDAO.getRepeatDate(stuId);
	}

	@Override
	public int AddReservation(Reservation reservation) {
		return studioReserveDAO.AddReservation(reservation);
	}

	@Override
	public int AddExceptionDates(ExceptionDate exceptionDate) {
		return studioReserveDAO.AddExceptionDates(exceptionDate);
	}

	@Override
	public List<Reservation> getReservation(Schedule schedule) {
		return studioReserveDAO.getReservation(schedule);
	}

	@Override
	public int UpdateReservation(Reservation reservation) {
		return studioReserveDAO.UpdateReservation(reservation);
	}

	@Override
	public int UpdateExceptionDate(ExceptionDate exceptionDate) {
		return studioReserveDAO.UpdateExceptionDate(exceptionDate);
	}

	@Override
	public int DeleteReservations(int resId) {
		return studioReserveDAO.DeleteReservation(resId);
	}

	@Override
	public int DeleteExceptionDate(int exceptionId) {
		return studioReserveDAO.DeleteExceptionDate(exceptionId);
	}
	
	@Override
	public Schedule getSchedule(Schedule schedule) {
		Schedule scheduleDTO = schedule;
		scheduleDTO.setExceptionDate(studioReserveDAO.getExceptionDate(schedule));
		scheduleDTO.setReservation(studioReserveDAO.getReservation(schedule));
		return scheduleDTO;
	}

	@Override
	public List<Reservation> getExpiredReservation(int custId) {
		return studioReserveDAO.getExpiredReservation(custId);
	}

	@Override
	public List<Reservation> getWillReservation(int custId) {
		return studioReserveDAO.getWillReservation(custId);
	}

	@Override
	public List<Reservation> getMonthReservation(Reservation reservation) {
		return studioReserveDAO.getMonthReservation(reservation);
	}

	@Override
	public List<Reservation> getWillStudioReservation(int stuId) {
		return studioReserveDAO.getWillStudioReservation(stuId);
	}
	
	
}
