package com.devils.pics;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Customer;
import com.devils.pics.domain.Studio;

@SpringBootTest
class ExtraTest {

	@Autowired
	private SqlSession sqlSession;
	private String NS ="ExtraMapper.";
	
	@Test
	void contextLoads() {
		
		
		
		
		/*
		 * Customer c = new Customer(); c.setCustId(1); Studio s = new Studio();
		 * s.setstuId(7);
		 * 
		 * Bookmark b = new Bookmark(); b.setCustomer(c); b.setStudio(s);
		 * 
		 * sqlSession.insert(NS+"addBookmark",b);
		 */
		 
		  
		  
		  
		  
		
		/*
		 * List<Studio> studios = sqlSession.selectList(NS+"getBookmark",1); for(Studio
		 * s: studios) { System.out.println(s); }
		 */
		  
		  //sqlSession.delete(NS+"deleteBookmark",3);
		 
		 
		 
	}

}
