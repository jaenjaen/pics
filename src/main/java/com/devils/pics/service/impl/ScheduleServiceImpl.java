package com.devils.pics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.ScheduleDAO;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.service.ScheduleService;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	
	@Autowired
	private ScheduleDAO scheduleDao;

	/* 스튜디오 공간 등록 관련 메소드 */
	@Override
	public int registerRepeatDate(RepeatDate repeatDate) {
		//RepeatDate 등록
		return scheduleDao.registerRepeatDate(repeatDate);
	}
}
