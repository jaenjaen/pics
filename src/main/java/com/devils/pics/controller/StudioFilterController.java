package com.devils.pics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.service.StudioFilterService;

@RestController
public class StudioFilterController {

	@Autowired
	private StudioFilterService studioFilterService;
}
