package com.devils.pics.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Category;
import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.service.ScheduleService;
import com.devils.pics.service.StudioFilterService;
import com.devils.pics.service.StudioInfoService;

@RestController
public class StudioRegisterController {

	@Autowired
	private ScheduleService scheduleService;
	
	@Autowired
	private StudioFilterService studioFilterService;
	
	@Autowired
	private StudioInfoService studioInfoService;
	
	@PostMapping("/studioReg")
	public ResponseEntity registerStudio(@RequestBody RepeatDate repeatDate,
			@RequestBody Studio studio, @RequestBody StudioFilter studioFilter,
			@RequestBody Category category, HttpSession httpSession) {
		try {
			/* 세션으로부터 회사 아이디를 받아와서 Studio에 Set */
			String comId = (String)httpSession.getAttribute("comId");
			System.out.println("회사 아이디 : "+ comId);
			studio.setComId(comId);
			
			/* Studio를 등록 
			   (추후 중복 등록 방지 필요... Studio의 이름, Studio의 주소로 구분해야 할 듯)
			   (중복일 경우 여기에서 끝내야 함) */
			int result = studioInfoService.registerStudioInfo(studio);
			System.out.println("Studio 등록 결과 : "+result);
			
			/* autoIncrement로 생긴 Studio Id를 가져와서 StudioFilter에 Set  */
			int stdId = studioInfoService.getStudioId(studio);
			System.out.println("autoIncrement로 생긴 Studio Id : "+stdId);
			studioFilter.setStdId(stdId);
			
			/* StudioFilter를 등록 */
			result = studioFilterService.registerStudioFilter(studioFilter);
			System.out.println("StudioFilter 등록 결과 : "+result);
			
			return new ResponseEntity(HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
}
