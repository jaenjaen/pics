package com.devils.pics.service.impl;

import java.util.List;

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

	/* studio Id로 RepeatDate 가져오기*/
	@Override
	public List<RepeatDate> getRepeatDateByStuId(int stuId) throws Exception {
		return scheduleDao.getRepeatDateByStuId(stuId);
	}
	
	/* studio Id로 RepeatDate 가져오기*/
	@Override
	public int updateRepeatDate(RepeatDate repeatDate) throws Exception {
		return scheduleDao.updateRepeatDate(repeatDate);
	}
	
	/* RepeatDate 삭제*/
	@Override
	public int deleteRepeatDate(int repeatId) throws Exception {
		return scheduleDao.deleteRepeatDate(repeatId);
	}
}
