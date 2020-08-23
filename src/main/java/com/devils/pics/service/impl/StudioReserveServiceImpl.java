package com.devils.pics.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Reservation;
import com.devils.pics.domain.Studio;
import com.devils.pics.service.StudioReserveService;

@Service
public class StudioReserveServiceImpl implements StudioReserveService {	
	@Autowired
	private StudioReserveService studioReserveService;

	@Override
	public ArrayList<ExceptionDate> getExceptionDate(Studio studio) {
		return studioReserveService.getExceptionDate(studio);
	}

	@Override
	public ArrayList<RepeatDate> getRepeatDate(Studio studio) {
		return studioReserveService.getRepeatDate(studio);
	}

	@Override
	public int reserve(Reservation reservation) {
		return studioReserveService.reserve(reservation);
	}

	@Override
	public int AddexceptionDates(Reservation reservation) {
		return studioReserveService.AddexceptionDates(reservation);
	}
}
