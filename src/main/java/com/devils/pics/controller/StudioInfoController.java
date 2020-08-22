package com.devils.pics.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.domain.Tag;
import com.devils.pics.service.ExtraService;
import com.devils.pics.service.StudioInfoService;


@RestController
public class StudioInfoController {

	@Autowired
	private StudioInfoService studioInfoService;

	/*스튜디오 정보 로딩
	 * 1. 기본 정보(스튜디오 필터/소속 업체/카테고리)
	 * 2. Studio 클래스에 없는 정보 (태그(채은), 누적 이용자수(채은),찜 여부(재은))
	 * 3. 리뷰 영역 (리뷰 객체, 평균 평점)
	 * 4. 데이터 분석 정보 >> 프론트에서 chart.js로, 추천 스튜디오 목록  
	 */

	@GetMapping("/getStudioInfo/{stuId}")
	public ResponseEntity getStudioInfo(@PathVariable int stuId) {
		// 1. 기본 정보(스튜디오 필터/소속 업체/카테고리)
		try {
		List<Studio> studioVO=studioInfoService.getStudioInfo(stuId);
		return new ResponseEntity(studioVO,HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage()+"찾으시는 스튜디오가 없습니다");
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}

	// 2-1. Studio 클래스에 없는 정보 (누적 이용자수)
	@GetMapping("/getAccCustomer/{stuId}")
	public ResponseEntity getAccCustomer(@PathVariable int stuId) {	
		try {
		//누적 이용자 수
		int accCust=studioInfoService.getAccCustomer(stuId);
		System.out.println(accCust);
		return new ResponseEntity(accCust,HttpStatus.OK);
		}catch (NullPointerException e) {
		System.out.println("아직 해당 스튜디오를 이용한 고객이 없습니다."+e.getMessage());
		return new ResponseEntity("실패",HttpStatus.NO_CONTENT);
		}
		}
	//2-2. Studio 클래스에 없는 정보 (태그)
	@GetMapping("/getTags/{stuId}")
	public ResponseEntity getTags(@PathVariable int stuId) {	
		List<Tag> tagVO=studioInfoService.getTags(stuId);
		return new ResponseEntity(tagVO,HttpStatus.OK);
	}
	//2-2. Studio 클래스에 없는 정보 (찜 여부)
	@GetMapping("/checkBookmark/{custId}/{stuId}")
	public ResponseEntity checkBookmark(@PathVariable("custId") int custId, 
										@PathVariable("stuId") int stuId) {	
		if((""+custId)!=("")) {
			List<Integer> idList=new ArrayList<Integer>();
			idList.add(custId);
			idList.add(stuId);
			int marking=studioInfoService.checkBookmark(idList);
			if(marking>0)
				return new ResponseEntity(marking,HttpStatus.OK);
			else
				return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/getStudioReviews/{stuId}")
	public ResponseEntity getStudioReviews(@PathVariable int stuId) {	
		try {
		List<Review> reviewVO=studioInfoService.getStudioReviews(stuId);
		System.out.println(reviewVO);
		return new ResponseEntity(reviewVO,HttpStatus.OK);
		}catch (NullPointerException e) {
			System.out.println("아직 작성된 스튜디오 리뷰가 없습니다");
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			}
		
		}
	}


		
		