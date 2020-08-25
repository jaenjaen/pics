package com.devils.pics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Customer;
import com.devils.pics.service.CustomerService;

@RestController
@CrossOrigin(origins={"*"})
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
	
	@GetMapping("/customer/{custId}")
	public ResponseEntity getCustomer(@PathVariable int custId) {
		try {
			Customer cust = customerService.getCustomer(custId);
			return new ResponseEntity(cust,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/customer")
	public ResponseEntity updateCustomer(@RequestBody Customer customer) {
		try {
			customerService.updateCustomer(customer);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/customer/{custId}")
	public ResponseEntity deleteCustomer(@PathVariable int custId) {
		try {
			customerService.deleteCustomer(custId);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
}
