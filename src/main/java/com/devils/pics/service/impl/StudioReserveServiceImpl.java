package com.devils.pics.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.StudioReserveDAO;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.service.StudioReserveService;

@Service
public class StudioReserveServiceImpl implements StudioReserveService {	
	@Autowired
	private StudioReserveDAO studioReserveDAO;

	@Override
	public ArrayList<ExceptionDate> getExceptionDate(int stuId) {
		List<ExceptionDate> exceptionDateList =new ArrayList<ExceptionDate>();
		for(ExceptionDate ex: studioReserveDAO.getExceptionDate(stuId))
			exceptionDateList .add(ex);
		return (ArrayList<ExceptionDate>) exceptionDateList;
	}

	@Override
	public ArrayList<RepeatDate> getRepeatDate(int stuId) {
		return studioReserveDAO.getRepeatDate(stuId);
	}

	@Override
	public int reserve(Reservation reservation) {
		return studioReserveDAO.reserve(reservation);
	}

	@Override
	public int AddexceptionDates(Reservation reservation) {
		return studioReserveDAO.AddexceptionDates(reservation);
	}
}
