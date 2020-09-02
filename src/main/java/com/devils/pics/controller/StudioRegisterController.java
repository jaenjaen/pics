package com.devils.pics.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Category;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.domain.Tag;
import com.devils.pics.service.ScheduleService;
import com.devils.pics.service.StudioFilterService;
import com.devils.pics.service.StudioInfoService;

@RestController
@CrossOrigin(origins={"*"}, maxAge=6000)
public class StudioRegisterController {
	
	@Autowired
	private ScheduleService scheduleService;
	
	@Autowired
	private StudioFilterService studioFilterService;
	
	@Autowired
	private StudioInfoService studioInfoService;
	
	@GetMapping("/category")
	public ResponseEntity getCategory() {
		List<Category> category = studioInfoService.getCategory();
		if(category.size()<1) return new ResponseEntity(HttpStatus.NO_CONTENT);
		else return new ResponseEntity(category, HttpStatus.OK);
	}
	
	@PostMapping("/studio")
	public ResponseEntity registerStudio(@RequestBody Studio studio) {
		System.out.println("받아온 폼값 : "+studio);
		int flag = 0;
		if(studio == null) {
			flag = 0;
			return new ResponseEntity(flag, HttpStatus.NO_CONTENT);
		}else {
			try {
				/* 받아온 폼값에서 studioFilter, tags, repeatDate를 각각 뽑아옴 */
				StudioFilter studioFilter = studio.getStudioFilter();
				ArrayList<Tag> tags = studio.getTag();
				ArrayList<RepeatDate> repeatDates = studio.getSchedule().getRepeatDate();
				
				System.out.println(studioFilter);
				System.out.println(tags);
				System.out.println(repeatDates);

				/* Studio를 등록 
			   (추후 중복 등록 방지 필요... Studio의 이름, Studio의 주소로 구분해야 할 듯)
			   (중복일 경우 여기에서 끝내야 함) */
				int result = studioInfoService.registerStudioInfo(studio);
				System.out.println("Studio 등록 결과 : "+result);

				/* autoIncrement로 생긴 Studio Id를 가져옴  */
				int stuId = studioInfoService.getStudioId(studio);
				System.out.println("autoIncrement로 생긴 Studio Id : "+stuId);
				
				/* studioFilter에 Studio Id를 set하고, studioFilter를 등록 */
				studioFilter.setStuId(stuId);
				result = studioFilterService.registerStudioFilter(studioFilter);
				System.out.println("studioFilter 등록 결과 : "+result);

				/* repeatDates에 Studio Id를 set하고, repeatDate를 등록 */
				for(RepeatDate repeatDate : repeatDates) {
					repeatDate.setStuId(stuId);
					result = scheduleService.registerRepeatDate(repeatDate);
				}
				System.out.println("repeatDates 등록 결과 : "+result);
				
				/* tags에  Studio Id를 set하고, tags를 등록 */
				for(Tag tag : tags) {
					tag.setStuId(stuId);
					result = studioInfoService.registerTag(tag);
				}
				System.out.println("tags 등록 결과 : "+result);
				flag = 1;
				return new ResponseEntity(flag, HttpStatus.OK);
			}catch(RuntimeException e) {
				flag = 0;
				return new ResponseEntity(flag, HttpStatus.NO_CONTENT);
			}
		}
	}
}
