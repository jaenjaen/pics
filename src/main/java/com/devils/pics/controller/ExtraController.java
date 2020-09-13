package com.devils.pics.controller;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;
import com.devils.pics.service.ExtraService;

@RestController
@CrossOrigin(origins= {"*"}, maxAge=6000)
public class ExtraController {

	@Autowired
	private ExtraService extraService;
	
	
	@PostMapping("/bookmark")
	public ResponseEntity addBookmark(@RequestBody Bookmark bookmark) {
		try {
			System.out.println(bookmark);
			int n = extraService.addBookmark(bookmark);
			System.out.println("상태 매세지 : "+n);
			return new ResponseEntity(n,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/bookmark/{custId}")
	public ResponseEntity getBookmark(@PathVariable int custId) {
		try {
			List<Studio> bookmark= extraService.getBookmark(custId);
			
			return new ResponseEntity(bookmark,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/bookmark/custId/{custId}/stuId/{stuId}")
	public ResponseEntity getBookmark(@PathVariable int custId, @PathVariable int stuId) {
		try {
			System.out.println(custId+", "+stuId);
			HashMap<String, Integer> ids = new HashMap<String, Integer>();
			ids.put("custId", custId);
			ids.put("stuId", stuId);
			Bookmark bm = extraService.getBookId(ids);
			System.out.println("getBookId : "+bm);
			return new ResponseEntity(bm,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/bookmark/{bookId}")
	public ResponseEntity deleteBookmark(@PathVariable int bookId) {
		System.out.println("deleteBookmark 호출됬다. ");
		try {
			int n= extraService.deleteBookmark(bookId);
			
			return new ResponseEntity(n, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/review")
	public ResponseEntity writeReview(@RequestBody Review review) {
		try {
			int n = extraService.writeReview(review);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/review/{custId}")
	public ResponseEntity getCustomerReivews(@PathVariable int custId) {
		try {
			List<Review> reviews= extraService.getCustomerReivews(custId);
			
			return new ResponseEntity(reviews,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/review/check/{resId}")
	public ResponseEntity checkReviews(@PathVariable int resId) {
		try {
			int flag = extraService.checkReviews(resId);
			return new ResponseEntity(flag,HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/review/{reviewId}")
	public ResponseEntity deleteReview(@PathVariable int reviewId) {
		try {
			int flag = extraService.deleteReview(reviewId);
			if(flag>0) return new ResponseEntity(flag,HttpStatus.OK);
			else return new ResponseEntity(HttpStatus.NOT_MODIFIED);
		}catch (Exception e){
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/bookmarklist/{custId}")
	public ResponseEntity getBookmarkList(@PathVariable int custId) {
		try {
			List<Studio> list= extraService.getBookmarkList(custId);
			
			return new ResponseEntity(list,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
}
