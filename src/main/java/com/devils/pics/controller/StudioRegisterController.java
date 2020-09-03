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

	/* 카테고리 목록을 화면으로 보냄 */
	@GetMapping("/category")
	public ResponseEntity getCategory() {
		List<Category> category = studioInfoService.getCategory();
		if(category.size()<1) return new ResponseEntity(HttpStatus.NO_CONTENT);
		else return new ResponseEntity(category, HttpStatus.OK);
	}

	/* 스튜디오를 등록하고 숫자를 응답함. 화면단에서 받은 응답값을 통해 alert를 다르게 띄움
	 * 화면으로부터 받은 studio가 null값이라서 응답할 내용이 없음. => 응답값 없음
	 * 성공 => 1 응답
	 * 이미 등록된 스튜디오임(중복 등록 방지) => -1 응답 */
	@PostMapping("/studio")
	public ResponseEntity registerStudio(@RequestBody Studio studio) {
		System.out.println("받아온 폼값 : "+studio);

		if(studio == null) { /* 받아온 studio가 비었을 경우  */
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}else {
			try {
				/* 받아온 폼값에서 studioFilter, tags, repeatDate를 각각 뽑아옴 */
				StudioFilter studioFilter = studio.getStudioFilter();
				ArrayList<Tag> tags = studio.getTag();
				ArrayList<RepeatDate> repeatDates = studio.getSchedule().getRepeatDate();

				System.out.println(studioFilter);
				System.out.println(tags);
				System.out.println(repeatDates);

				String comId = studio.getComId();
				System.out.println("comId : " + comId);
				/* 이미 존재하는 studio인지 검사 
				 * comId, name이 같거나 comId, address가 같은 스튜디오이면 등록 방지 */
				boolean isExist = studioInfoService.isExistStudio(studio);
				System.out.println("이미 존재하는 스튜디오입니까? "+isExist);
				if(isExist == true) { //이미 존재하는 스튜디오일 경우
					return new ResponseEntity(-1, HttpStatus.OK);
				}
				else { //존재하지 않은 스튜디오일 경우
					/* studio를 등록  */
					int result = studioInfoService.registerStudioInfo(studio);
					System.out.println("Studio 등록 결과 : "+result);

					/* autoIncrement로 생긴 Studio Id를 가져옴
					 * (SQL문으로 name, comId가 모두 동일할 경우에만 가져옴. 
					 * 다른 업체의 같은 이름 스튜디오 stuId를 가져오는 것을 방지함.)  */
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

				}

			}catch(RuntimeException e) {
				//e.printStackTrace();
			}
			return new ResponseEntity(1, HttpStatus.OK);
		}
	}

}