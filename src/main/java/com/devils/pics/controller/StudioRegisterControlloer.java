package com.devils.pics.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.RepeatDate;
import com.devils.pics.domain.Studio;
import com.devils.pics.domain.StudioFilter;
import com.devils.pics.service.ScheduleService;
import com.devils.pics.service.StudioFilterService;
import com.devils.pics.service.StudioInfoService;

@RestController
public class StudioRegisterControlloer {

	@Autowired
	private ScheduleService scheduleService;
	private StudioFilterService studioFilterService;
	private StudioInfoService studioInfoService;
	
	@PostMapping("/studioReg")
	public ResponseEntity registerStudio(@RequestBody RepeatDate repeatDate,
			@RequestBody Studio studio, @RequestBody StudioFilter studioFilter,
			HttpSession httpSession) {
		String comId = (String)httpSession.getAttribute("");
		try {
			return new ResponseEntity(HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
}
