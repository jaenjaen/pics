package com.devils.pics.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@CrossOrigin(origins={"*"}, maxAge=6000)
public class FileController {
	
	/* 업로드한 파일의 경로를 가지고 감 */
	@GetMapping("/getPath/{subPath}")
	public ResponseEntity getPath(@PathVariable String subPath,
										HttpSession session) {
		String root = session.getServletContext().getRealPath("/");
		String path = root + "upload\\" + subPath + "\\";
		return new ResponseEntity(path, HttpStatus.OK);
	}
	
	/* 싱글 파일 업로드 */
	@PostMapping("/fileUpload/{subPath}")
	public ResponseEntity uploadImage(@RequestBody MultipartFile file, 
									@PathVariable String subPath, 
									HttpServletRequest request) {		
		/* 업체 아이디 받아오기 */
		String comId = "11@sample.com";
		
		String fileName = ""; //화면으로 보낼 파일의 이름들
		
		/* 파일 경로 설정하기 */
		String root = request.getSession().getServletContext().getRealPath("/");
		String path = root + "upload\\" + subPath + "\\"; //공통 파일 경로
		System.out.println(path);
		
		if(file==null) return new ResponseEntity(HttpStatus.NO_CONTENT);
		
		else {
			fileName = file.getOriginalFilename(); //업로드된 파일명
			
			/* 파일 정보 확인 */
			System.out.println("파일의 사이즈 :: "+file.getSize());
			System.out.println("업로드된 파일명 :: "+fileName);
			System.out.println("파일의 파라미터명 :: "+file.getName());
			
			/* 파일 이름 설정하기(현재시간+_+comId+확장자) */
			String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS")); //현재 시간
			int i = fileName.lastIndexOf("."); //파일 확장자 위치
			fileName = now + "_" + comId + fileName.substring(i, fileName.length());
			System.out.println("새롭게 설정한 파일 이름 :: " + fileName);
			
			try {
				file.transferTo(new File(path+fileName)); //파일 생성
			} catch (IllegalStateException | IOException e) {
				//e.printStackTrace();
			}
			return new ResponseEntity(fileName, HttpStatus.OK);
		}
	}
	
	/* 멀티 파일 업로드 */
	@PostMapping("/filesUpload/{subPath}")
	public ResponseEntity uploadImages(@RequestBody List<MultipartFile> files, 
									@PathVariable String subPath, 
									HttpServletRequest request) {
		/* 업체 아이디 받아오기 */
		String comId = "11@sample.com";
		
		System.out.println();
		
		String fileNames = ""; //화면으로 보낼 파일의 이름들
		
		/* 파일 경로 설정하기 */
		String root = request.getSession().getServletContext().getRealPath("/");
		String path = root + "upload\\" + subPath + "\\"; //공통 파일 경로
		System.out.println(path);
		
		if(files.size()==0) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
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
				int i = fileName.lastIndexOf("."); //파일 확장자 위치
				fileName = now + "_" + comId + fileName.substring(i, fileName.length());
				System.out.println("새롭게 설정한 파일 이름 :: " + fileName);
				
				fileNames += fileName + ",";
				
				try {
					file.transferTo(new File(path+fileName)); //파일 생성
				} catch (IllegalStateException | IOException e) {
					//e.printStackTrace();
				}
			}
			fileNames = fileNames.substring(0, fileNames.length()-1);
			return new ResponseEntity(fileNames, HttpStatus.OK);
		} 
	}
}
