package com.devils.pics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.service.ExtraService;

@RestController
public class ExtraController {

	@Autowired
	private ExtraService extraService;
	
}
