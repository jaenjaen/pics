package com.devils.pics.dao;

import com.devils.pics.domain.RepeatDate;

public interface ScheduleDAO {
	
	/* 스튜디오 공간 등록 관련 메소드 */
	public int registerRepeatDate(RepeatDate repeatDate); //RepeatDate 등록
}

