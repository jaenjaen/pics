package com.devils.pics.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Studio;
import com.devils.pics.service.ExtraService;

@RestController
public class ExtraController {

	@Autowired
	private ExtraService extraService;
	
	@GetMapping("/bookmark/{custId}")
	public ResponseEntity addBookmark(@PathVariable int custId) {
		try {
			List<Studio> bookmark= extraService.getBookmark(custId);
			
			return new ResponseEntity(bookmark,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
}
