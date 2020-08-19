package com.devils.pics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.service.StudioInfoService;

@RestController
public class StudioInfoController {

	@Autowired
	private StudioInfoService studioInfoService;
}
