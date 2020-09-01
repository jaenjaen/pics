package com.devils.pics.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.devils.pics.domain.Category;
import com.devils.pics.domain.Company;
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

	String path;
	String comId;
	
	@Autowired
	private ScheduleService scheduleService;
	
	@Autowired
	private StudioFilterService studioFilterService;
	
	@Autowired
	private StudioInfoService studioInfoService;
	
	@PostMapping("/imageUpload")
	public ResponseEntity uploadImage(@RequestBody List<MultipartFile> files, HttpServletRequest request, HttpServletResponse response) {
		String[] nameList = new String[files.size()]; //파일 이름
		
		String root = request.getSession().getServletContext().getRealPath("/");
		path = root+"\\frontend\\src\\assets\\img\\upload\\"; //파일 경로

		int count = 0;
		for(MultipartFile file : files) {
			System.out.println("파일의 사이즈 :: "+file.getSize());
			System.out.println("업로드된 파일명 :: "+file.getOriginalFilename());
			System.out.println("파일의 파라미터명 :: "+file.getName());
			
			String filename = file.getOriginalFilename();
			nameList[count++] = filename;
			
			try {
				file.transferTo(new File(path+filename));
			} catch (IllegalStateException e) {
				//e.printStackTrace();
			} catch (IOException e) {
				//e.printStackTrace();
			} 
		}
		
		if(nameList==null) return new ResponseEntity(HttpStatus.NO_CONTENT);
		else return new ResponseEntity(nameList, HttpStatus.OK);
	}
	
	@PostMapping("/studio")
	public ResponseEntity registerStudio(@RequestBody Studio studio) {
		System.out.println("받아온 폼값 : "+studio);
		
		StudioFilter studioFilter = studio.getStudioFilter();
		//ArrayList<Tag> tags = studio.getTag();
		//ArrayList<RepeatDate> repeatDates = studio.getSchedule().getRepeatDate();
		
		try {
			/* 세션으로부터 회사 아이디를 받아와서 Studio에 Set */
			//String comId = (String)httpSession.getAttribute("comId");
			
			comId = "11@sample.com";
			System.out.println("회사 아이디 : "+ comId);
			studio.setComId(comId);
			
			System.out.println(studio);
			
			/* Studio를 등록 
			   (추후 중복 등록 방지 필요... Studio의 이름, Studio의 주소로 구분해야 할 듯)
			   (중복일 경우 여기에서 끝내야 함) */
			int result = studioInfoService.registerStudioInfo(studio);
			System.out.println("Studio 등록 결과 : "+result);
			
			/* autoIncrement로 생긴 Studio Id를 가져옴  */
			int stdId = studioInfoService.getStudioId(studio);
			System.out.println("autoIncrement로 생긴 Studio Id : "+stdId);
			
			/* StudioFilter에 Studio Id를 set하고, StudioFilter를 등록 */
			studioFilter.setStuId(stdId);
			result = studioFilterService.registerStudioFilter(studioFilter);
			System.out.println("StudioFilter 등록 결과 : "+result);
			
			/* RepeatDate에 Studio Id를 set하고, RepeatDate를 등록 */
			/*
			for(RepeatDate repeatDate : repeatDates) {
				repeatDate.setStuId(stdId);
				result = scheduleService.registerRepeatDate(repeatDate);
			}
			System.out.println("RepeatDate 등록 결과 : "+result);
			*/
			return new ResponseEntity(HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
}
