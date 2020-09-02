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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Studio;
import com.devils.pics.service.StudioFilterService;
import com.devils.pics.util.SearchCon;

@RestController
@CrossOrigin(origins= {"*"}, maxAge=6000)
public class StudioFilterController {

	@Autowired
	private StudioFilterService studioFilterService;
	
	// 전체 출력
	@GetMapping("/studio/search")
	public ResponseEntity searchStudio(){
		try {
			List<Studio> list = studioFilterService.searchStudio();
			System.out.println("list sample : "+list.get(0));
			return new ResponseEntity(list, HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	
	// 필터 출력
	@PostMapping("/studio/search/filter")
	public ResponseEntity searchStudio(@RequestBody HashMap<String, String> filters){
		try {
			System.out.println("1.--------------------------");
			System.out.println("filter list : "+filters);
			System.out.println("2.--------------------------");
			System.out.println("filtermap : "+getSearchCon(filters));
			List<Studio> list = studioFilterService.searchStudio(getSearchCon(filters));
			System.out.println("3.--------------------------");
			System.out.println("list size : "+list.size());
			System.out.println("4.--------------------------");
			System.out.println("list sample : "+list.get(0));
			for(Studio std : list) System.out.println(std);
			return new ResponseEntity(list, HttpStatus.OK);
		}catch(RuntimeException e) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
	}
	// Client로 받은 정보를 VO로 전환
	public SearchCon getSearchCon(HashMap<String, String> filters) {
		SearchCon searchCon = new SearchCon();
		if (filters.get("categoryId").length()>0 && !filters.get("categoryId").equals("-1"))
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
		if (filters.get("searchTag").length()>0) {
			searchCon.setSearchTag(filters.get("searchTag").substring(1, filters.get("searchTag").length()));
		}
		if (filters.get("orderCon").length()>0)
			searchCon.setOrderCon(filters.get("orderCon"));
		if (filters.get("session").length()>0)
			searchCon.setCustId(Integer.parseInt(filters.get("session")));
		searchCon.setPage(Integer.parseInt(filters.get("page")));

		return searchCon;
	}
	
	    // 추천 장소 보내주기 
		@GetMapping("/studio/popular")
		public ResponseEntity popularStudio(){
			try {
				List<Studio> list = studioFilterService.searchStudio();
				List<Studio> sendList = new ArrayList<>();
				int numList[] = new int[10];
				
				for(int i=0; i<10; i++) {
					numList[i]= (int)(Math.random()*list.size())+1;
					
					for(int j=0; j<i; j++) {
						if(numList[i]==numList[j]) {
							i--;
							break;
						}// if
					}//for j
					
					sendList.add(list.get(numList[i]));
				} // for i
				
				System.out.println(sendList);
				return new ResponseEntity(sendList, HttpStatus.OK);
			}catch(RuntimeException e) {
				return new ResponseEntity(HttpStatus.NO_CONTENT);
			}
		}
}
