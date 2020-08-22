package com.devils.pics;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Customer;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;

@SpringBootTest
public class ExtraTest {

	@Autowired
	private SqlSession sqlSession;
	private String NS ="ExtraMapper.";
	
	@Test
	void contextLoads() {
		
		SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
		Date time = new Date();
		String time1 = format1.format(time);
		
		
		  //Bookmark b = new Bookmark(); b.setCustomer(c); b.setStudio(s);
		  //sqlSession.insert(NS+"addBookmark",b);
		  /*
			 * List<Studio> studios = sqlSession.selectList(NS+"getBookmark",1); for(Studio
			 * s: studios) { System.out.println(s); }
			 */
			  
			  //sqlSession.delete(NS+"deleteBookmark",3);
		
		/*
		 * Customer c = new Customer(); c.setCustId(1); Studio s = new Studio();
		 * s.setStuId(18);
		 * 
		 * Review r = new Review(); r.setCustomer(c); r.setStudio(s); r.setScore(5);
		 * r.setContent("광주에서야경찍으려면여기로걍야경개쩜"); r.setImg("사진.png"); r.setRegDate(time1);
		 * System.out.println(c+","+r+","+s); int
		 * result=sqlSession.insert(NS+"writeReview",r);
		 * System.out.println("result : "+result);
		 */
		
//		List<Review> reviewList = sqlSession.selectList(NS+"getCustomerReivews",1);
//		for(Review r:reviewList) {
//			System.out.println(r);
//		}
		 
		  
		 
	}
}
