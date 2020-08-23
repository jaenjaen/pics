package com.devils.pics.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Studio;
import com.devils.pics.service.StudioFilterService;

@RestController
public class StudioFilterController {

	@Autowired
	private StudioFilterService studioFilterService;
	
	@GetMapping("/studio/{categoryId}")
	public ResponseEntity searchStudio(
			@PathVariable("categoryId") String categoryId
			//,@PathVariable("weekDate") String weekDate
			) 
	{
		try {
			HashMap<String, String> filterMap = new HashMap<String, String>();
			filterMap.put("categoryId", categoryId);
			//filterMap.put("weekDate", weekDate);
			List<Studio> list = studioFilterService.searchStudio(filterMap);
			System.out.println(1);
			return new ResponseEntity(list, HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
}
