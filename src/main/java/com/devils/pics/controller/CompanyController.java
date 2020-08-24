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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Company;
import com.devils.pics.service.CompanyService;

@RestController
@CrossOrigin(origins = "*")
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	
	@PostMapping("/company")
	public ResponseEntity registerCustomer(@RequestBody Company company) {
		try {
			companyService.registerCompany(company);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/company?comId={comId}&password={password}")
	public ResponseEntity loginCompany(@RequestParam("comId") String comId,@RequestParam("password") String password) {
		try {
			Company company = new Company();
			company.setComId(comId);
			company.setPassword(password);
			
			Company comp = companyService.loginCompany(company);
			return new ResponseEntity(comp,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/company/{comId}")
	public ResponseEntity getCompany(@PathVariable String comId) {
		try {
			Company company = new Company();
			company.setComId(comId);
			
			Company comp = companyService.getCompany(company);
			return new ResponseEntity(comp,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/company")
	public ResponseEntity updateCustomer(@RequestBody Company company) {
		try {
			companyService.updateCompnay(company);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/company/{comId}")
	public ResponseEntity deleteCustomer(@PathVariable String comId) {
		try {
			companyService.deleteCompany(comId);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
}
