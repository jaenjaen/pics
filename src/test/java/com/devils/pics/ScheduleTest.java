package com.devils.pics;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.RepeatDate;

@SpringBootTest
public class ScheduleTest {

	@Autowired
	private SqlSession sqlSession;
	
	private String ns = "ScheduleMapper.";
	
	RepeatDate getSample() {
		RepeatDate repeatDate = new RepeatDate();
		repeatDate.setStuId(1154);
		repeatDate.setWeekday("sun");
		repeatDate.setTime("6-8, 12-18");
		return repeatDate;
	}
	
	/* RepeatDate 등록 - 단위 테스트 성공 */
	@Test
	void registerRepeatDate() {
		RepeatDate repeatDate = getSample();
//		int result = sqlSession.insert("ScheduleMapper.registerRepeatDate", repeatDate);
//		System.out.println(result);
		
		/* call repeatDate*/
//		List<RepeatDate> repeatDates= sqlSession.selectList(ns+"getRepeatDateByStuId",1154);
//		for(RepeatDate r:repeatDates) {
//			System.out.println(r);
//		}
		
		/*운영일 변경*/
//		int n = sqlSession.update(ns+"updateRepeatDate",repeatDate);
//		System.out.println(n);
	}
}
