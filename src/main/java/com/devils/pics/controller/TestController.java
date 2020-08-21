package com.devils.pics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.RepeatDate;
import com.devils.pics.service.ScheduleService;

@RestController
@CrossOrigin(origins={"*"}, maxAge=6000)
public class TestController {

	@Autowired
	private ScheduleService scheduleService;
	
	@PostMapping("/test")
	public ResponseEntity registerStudio(@RequestBody RepeatDate repeatDate) {
		try {
			scheduleService.registerRepeatDate(repeatDate);
			return new ResponseEntity(HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
}
