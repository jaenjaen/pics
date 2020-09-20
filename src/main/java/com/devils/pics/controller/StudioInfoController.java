package com.devils.pics.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Customer;
import com.devils.pics.domain.ExceptionDate;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Review;
import com.devils.pics.domain.Schedule;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.Tag;
import com.devils.pics.service.StudioInfoService;
import com.devils.pics.service.StudioReserveService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/*스튜디오 정보 로딩 flow
 * 1. 기본 정보(스튜디오 필터/소속 업체/카테고리)
 * 2. Studio 클래스에 없는 정보 (태그, 누적 이용자수,찜 여부)
 * 3. 리뷰 영역 (리뷰 객체, 평균 평점)
 * 4. 데이터 분석 정보 >> 프론트에서 chart.js로, 추천 스튜디오 목록  
 */

@RestController
@CrossOrigin(origins={"*"}, maxAge=6000)
@Api(tags= {"Pics Studio-Info"})
public class StudioInfoController {
	@Autowired
	private StudioInfoService studioInfoService;

	@Autowired
	private StudioReserveService studioReserveService;
	
	@ApiOperation(value="스튜디오 기본 정보(필터/소속 업체/카테고리) 반환", response = List.class)
	@GetMapping("/studio/info/{stuId}")
	public ResponseEntity<List<Studio>> getStudioInfo(@PathVariable int stuId) {	
		try {		
		List<Studio> studioVO=studioInfoService.getStudioInfo(stuId);		
		//System.out.println(studioVO);
		return new ResponseEntity<List<Studio>>(studioVO,HttpStatus.OK);
		} catch (Exception e) {
			//System.out.println(e.getMessage()+"찾으시는 스튜디오가 없습니다");
			return new ResponseEntity<List<Studio>>(HttpStatus.NO_CONTENT);
		}
	}
	
	@ApiOperation(value="스튜디오 누적 view수 반환", response = Integer.class)
	@GetMapping("/studio/accCustomer/{stuId}")
	public ResponseEntity getAccCustomer(@PathVariable int stuId) {	
		try {
		int accCust=studioInfoService.getAccCustomer(stuId);
		//System.out.println(accCust);
		return new ResponseEntity(accCust,HttpStatus.OK);
		}catch (NullPointerException e) {
		//System.out.println("아직 해당 스튜디오를 이용한 고객이 없습니다."+e.getMessage());
		return new ResponseEntity("실패",HttpStatus.NO_CONTENT);
		}
	}
	
	@ApiOperation(value="스튜디오 태그 반환", response = List.class)
	@GetMapping("studio/tags/{stuId}")
	public ResponseEntity<List<Tag>> getTags(@PathVariable int stuId) {	
		List<Tag> tagVO=studioInfoService.getTags(stuId);
		return new ResponseEntity<List<Tag>>(tagVO,HttpStatus.OK);
	}
	
	@ApiOperation(value="스튜디오 찜여부 반환", response = Integer.class)
	@GetMapping("/studio/getBookmark/{custId}/{stuId}")
	public ResponseEntity<Integer> getBookmark(@PathVariable int custId,@PathVariable int stuId) {	
		try {
		if(custId>0) {
			List<Integer> idList=new ArrayList<Integer>();
			idList.add(custId);
			idList.add(stuId);
			int bookmarkId=studioInfoService.getBookmark(idList);
			if(bookmarkId!=0) return new ResponseEntity<Integer>(bookmarkId,HttpStatus.OK);
			else return new ResponseEntity<Integer>(0,HttpStatus.NO_CONTENT);
		}else return new ResponseEntity<Integer>(0,HttpStatus.NO_CONTENT);
		}catch(NullPointerException e) {
			return new ResponseEntity<Integer>(0,HttpStatus.NO_CONTENT);
			}
	}
	
	
	@ApiOperation(value="스튜디오 리뷰 반환", response = List.class)
	@GetMapping("/studio/reviews/{stuId}")
	public ResponseEntity<List<Review>> getStudioReviews(@PathVariable int stuId) {	
		try {
		List<Review> reviewVO=studioInfoService.getStudioReviews(stuId);
		return new ResponseEntity<List<Review>>(reviewVO,HttpStatus.OK);
		}catch (NullPointerException e) {
			return new ResponseEntity<List<Review>>(HttpStatus.NO_CONTENT);
			}
		}
	
}




		
		