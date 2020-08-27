package com.devils.pics.controller;

import java.io.FileNotFoundException;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devils.pics.domain.Company;
import com.devils.pics.service.CompanyService;

@RestController
@CrossOrigin(origins={"*"})
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	
	@PostMapping("/company")
	public ResponseEntity registerCustomer(@RequestBody Company company) {
		try {
			companyService.registerCompany(company);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(HttpStatus.OK);
	}
	
	@GetMapping("/company/{comId}/{password}")
	public ResponseEntity loginCompany(@PathVariable String comId,@PathVariable String password) {
		Company comp = null;
		Company company = new Company();
		company.setComId(comId);
		company.setPassword(password);
		try {
			comp = companyService.loginCompany(company);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		} catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(comp, HttpStatus.OK);
	}
	
	@GetMapping("/company/{comId}")
	public ResponseEntity getCompany(@PathVariable String comId) {
		Company comp =  null;
		try {
			Company company = new Company();
			company.setComId(comId);
			
			 comp = companyService.getCompany(company);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(comp,HttpStatus.OK);
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
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(HttpStatus.OK);
	}
}
