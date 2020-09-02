package com.devils.pics.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

	String path; //공통 파일 경로
	String comId; //업체 아이디
	
	@Autowired
	private ScheduleService scheduleService;
	
	@Autowired
	private StudioFilterService studioFilterService;
	
	@Autowired
	private StudioInfoService studioInfoService;
	
	/* 단일 이미지 파일 업로드 */
	@PostMapping("/imageUpload")
	public ResponseEntity uploadImage(@RequestBody MultipartFile file, HttpServletRequest request, HttpServletResponse response) {		
		/* 업체 아이디 받아오기 */
		comId = "11@sample.com";
		
		/* 파일 경로 설정하기 */
		String root = request.getSession().getServletContext().getRealPath("/");
		path = root + "upload\\";
		System.out.println(path);
		
		if(file==null) return new ResponseEntity(HttpStatus.NO_CONTENT);
		
		else {
			String fileName = file.getOriginalFilename(); //업로드된 파일명
			
			/* 파일 정보 확인 */
			System.out.println("파일의 사이즈 :: "+file.getSize());
			System.out.println("업로드된 파일명 :: "+fileName);
			System.out.println("파일의 파라미터명 :: "+file.getName());
			
			/* 파일 이름 설정하기(현재시간+_+comId+확장자) */
			String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS")); //현재 시간
			int i = -1;
	      	i = fileName.lastIndexOf("."); //파일 확장자 위치
			String filename = now + "_" + comId + fileName.substring(i, fileName.length());
			System.out.println("새롭게 설정한 파일 이름 :: " + fileName);
			
			try {
				file.transferTo(new File(path+filename)); //파일 생성
			} catch (IllegalStateException | IOException e) {
				//e.printStackTrace();
			}
			return new ResponseEntity(filename, HttpStatus.OK);
		}
	}
	
	/* 멀티 이미지 파일 업로드 */
	@PostMapping("/imagesUpload")
	public ResponseEntity uploadImages(@RequestBody List<MultipartFile> files, HttpServletRequest request, HttpServletResponse response) {
		/* 업체 아이디 받아오기 */
		comId = "11@sample.com";
		
		String[] nameList = new String[files.size()]; //파일 이름을 저장할 배열
		
		/* 파일 경로 설정하기 */
		String root = request.getSession().getServletContext().getRealPath("/");
		path = root + "upload\\";
		System.out.println(path);
		
		if(nameList==null) return new ResponseEntity(HttpStatus.NO_CONTENT);
		else {
			int count = 0;
			for(MultipartFile file : files) {
				String fileName = file.getOriginalFilename(); //업로드된 파일명
				
				/* 파일 정보 확인 */
				System.out.println("파일의 사이즈 :: "+file.getSize());
				System.out.println("업로드된 파일명 :: "+file.getOriginalFilename());
				System.out.println("파일의 파라미터명 :: "+file.getName());
				
				/* 파일 이름 설정하기(현재시간+_+comId+확장자) */
				String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS")); //현재 시간
				int i = -1;
		      	i = fileName.lastIndexOf("."); //파일 확장자 위치
				String filename = now + "_" + comId + fileName.substring(i, fileName.length());
				System.out.println("새롭게 설정한 파일 이름 :: " + fileName);
				
				nameList[count++] = filename;
				
				try {
					file.transferTo(new File(path+filename)); //파일 생성
				} catch (IllegalStateException | IOException e) {
					//e.printStackTrace();
				}
			}
			return new ResponseEntity(nameList, HttpStatus.OK);
		} 
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
