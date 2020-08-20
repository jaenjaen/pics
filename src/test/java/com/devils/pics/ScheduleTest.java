package com.devils.pics;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.RepeatDate;

@SpringBootTest
class ScheduleTest {

	@Autowired
	private SqlSession sqlSession;
	
	RepeatDate getSample() {
		RepeatDate repeatDate = new RepeatDate();
		repeatDate.setStuId(8);
		repeatDate.setWeekDate("토");
		repeatDate.setTime("7-9, 10-15");
		return repeatDate;
	}
	
	/* RepeatDate 등록 - 단위 테스트 성공 */
	@Test
	void registerRepeatDate() {
		RepeatDate repeatDate = getSample();
		int result = sqlSession.insert("ScheduleMapper.registerRepeatDate", repeatDate);
		System.out.println(result);
	}
}
