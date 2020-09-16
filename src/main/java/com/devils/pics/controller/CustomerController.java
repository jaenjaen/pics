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

import com.devils.pics.domain.Company;
import com.devils.pics.domain.Customer;
import com.devils.pics.service.CustomerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins={"*"})
@Api(tags= {"Pics Personal-Customer"})
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	@ApiOperation(value="개인 회원 가입")
	@PostMapping("/customer")
	public ResponseEntity registerCustomer(@RequestBody Customer customer) {
		try {
			customerService.registerCustomer(customer);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value="개인 회원 로그인", response = Customer.class)
	@GetMapping("/customer/{apiKey}")
	public ResponseEntity getCustomer(@PathVariable String apiKey) {
		try {
			Customer cust = customerService.getCustomer(apiKey);
			return new ResponseEntity(cust,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value="개인 회원 정보 수정")
	@PutMapping("/customer")
	public ResponseEntity updateCustomer(@RequestBody Customer customer) {
		try {
			customerService.updateCustomer(customer);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value="개인 회원 탈퇴")
	@DeleteMapping("/customer/{custId}")
	public ResponseEntity deleteCustomer(@PathVariable int custId) {
		try {
			customerService.deleteCustomer(custId);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
}
