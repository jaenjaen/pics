package com.devils.pics.dao;

import java.util.List;

import com.devils.pics.domain.RepeatDate;

public interface ScheduleDAO {
	
	/* 스튜디오 공간 등록 관련 메소드 */
	public int registerRepeatDate(RepeatDate repeatDate); //RepeatDate 등록
	
	/* 스튜디오 수정 관련 메소드 */
	public List<RepeatDate> getRepeatDateByStuId (int stuId) throws Exception; //repeatDate calling
	public int updateRepeatDate (RepeatDate repeatDate) throws Exception; //repeatdate 업데이
	
	/* 스튜디오 삭제 관련 메소드 */
	public int deleteRepeatDate (int repeatId) throws Exception;//delete repeatDate
}

