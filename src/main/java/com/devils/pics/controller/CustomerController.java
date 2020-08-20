package com.devils.pics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Customer;
import com.devils.pics.service.CustomerService;

@RestController
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/customer")
	public ResponseEntity registerCustomer(@RequestBody Customer customer) {
		try {
			customerService.registerCustomer(customer);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		
	}
	
}
