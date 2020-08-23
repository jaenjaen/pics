package com.devils.pics.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Studio;
import com.devils.pics.service.StudioFilterService;
import com.devils.pics.util.SearchCon;

@RestController
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
	
	@GetMapping("/studio/search/{filters}")
	public ResponseEntity searchStudio(@PathVariable("filters") ArrayList<String> filters){
		try {
			List<Studio> list = studioFilterService.searchStudio(getSearchCon(filters));
			System.out.println("filter list : "+filters);
			System.out.println("filtermap : "+getSearchCon(filters));
			return new ResponseEntity(list, HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	public SearchCon getSearchCon(ArrayList<String> filters) {
		SearchCon searchCon = new SearchCon();
		for(String filter : filters) {
			String[] temp = filter.split("=");
			switch (temp[0]) {
			case "categoryId":
				searchCon.setCategoryId(temp[1]);
				break;
			case "weekDate":
				searchCon.setWeekDate(temp[1]);
				break;
			case "selectedDate":
				searchCon.setSelectedDate(temp[1]);
				break;
			case "address":
				searchCon.setAddress(temp[1]);
				break;
			case "minSize":
				searchCon.setMinSize(temp[1]);
				break;
			case "maxSize":
				searchCon.setMaxSize(temp[1]);
				break;
			case "minUnitPrice":
				searchCon.setMinUnitPrice(temp[1]);
				break;
			case "maxUnitPrice":
				searchCon.setMaxUnitPrice(temp[1]);
				break;
			case "capacity":
				searchCon.setCapacity(temp[1]);
				break;
			case "searchContent":
				ArrayList<String> array = new ArrayList<>(Arrays.asList(temp[1].split(" ")));
				searchCon.setSearchContent(array);
				break;
			case "searchTag":
				searchCon.setSearchTag(temp[1]);
				break;
			case "orderCon":
				searchCon.setOrderCon(temp[1]);
				break;
			}
		}
		return searchCon;
	}
}
