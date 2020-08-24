package com.devils.pics.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Studio;
import com.devils.pics.service.StudioFilterService;
import com.devils.pics.util.SearchCon;

@RestController
@CrossOrigin(origins= {"*"}, maxAge=6000)
public class StudioFilterController {

	@Autowired
	private StudioFilterService studioFilterService;
	
	@GetMapping("/studio/search")
	public ResponseEntity searchStudio(){
		try {
			List<Studio> list = studioFilterService.searchStudio();
			return new ResponseEntity(list, HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	@PostMapping("/studio/search/filter")
	public ResponseEntity searchStudio(@RequestBody HashMap<String, String> filters){
		try {
			System.out.println("filter list : "+filters);
			List<Studio> list = studioFilterService.searchStudio(getSearchCon(filters));
			System.out.println("filtermap : "+getSearchCon(filters));
			System.out.println("list size : "+list.size());
			return new ResponseEntity(list, HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	public SearchCon getSearchCon(HashMap<String, String> filters) {
		SearchCon searchCon = new SearchCon();
		if (filters.get("categoryId").length()>0)
			searchCon.setCategoryId(filters.get("categoryId"));
		if (filters.get("weekDate").length()>0)
			searchCon.setWeekDate(filters.get("weekDate"));
		if (filters.get("selectedDate").length()>0)
			searchCon.setSelectedDate(filters.get("selectedDate"));
		if (filters.get("address1").length()>0)
			searchCon.setAddress1(filters.get("address1"));
		if (filters.get("address2").length()>0)
			searchCon.setAddress2(filters.get("address2"));
		if (filters.get("minSize").length()>0)
			searchCon.setMinSize(filters.get("minSize"));
		if (filters.get("maxSize").length()>0)
			searchCon.setMaxSize(filters.get("maxSize"));
		if (filters.get("minUnitPrice").length()>0)
			searchCon.setMinUnitPrice(filters.get("minUnitPrice"));
		if (filters.get("maxUnitPrice").length()>0)
			searchCon.setMaxUnitPrice(filters.get("maxUnitPrice"));
		if (filters.get("capacity").length()>0)
			searchCon.setCapacity(filters.get("capacity"));
		if (filters.get("searchContent").length()>0) {
			ArrayList<String> array = new ArrayList<>(Arrays.asList(filters.get("searchContent").split(" ")));
			searchCon.setSearchContent(array);
		}
		if (filters.get("searchTag").length()>0)
			searchCon.setSearchTag(filters.get("searchTag"));
		if (filters.get("orderCon").length()>0)
			searchCon.setOrderCon(filters.get("orderCon"));

		return searchCon;
	}
}
