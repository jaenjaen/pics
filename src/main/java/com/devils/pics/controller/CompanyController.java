package com.devils.pics.controller;

import java.io.FileNotFoundException;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LogFile;
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
import com.devils.pics.util.security.JwtService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins={"*"})
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	@Autowired
	private JwtService jwtService;
	
	
	@PostMapping("/company")
	public ResponseEntity registerCustomer(@RequestBody Company company) {
		try {
			companyService.registerCompany(company);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}

	}
	
	@GetMapping("/company/{comId}/{password}")
	public ResponseEntity loginCompany(@PathVariable String comId,@PathVariable String password,HttpServletResponse res) {
		Company company = new Company();
		company.setComId(comId);
		company.setPassword(password);
		
		
		try {
			Company comp = companyService.loginCompany(company);
			String token = jwtService.create(comp);
			
			res.setHeader("jwt-auth-token", token);
			
			return new ResponseEntity(comp, HttpStatus.OK);
			
		} catch (FileNotFoundException e) {
			return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch(Exception ex) {
			ex.printStackTrace();
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
			e.printStackTrace();
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
	
	@GetMapping("/companyifo/{comId}")
	public ResponseEntity getCompanyinfo(@PathVariable String comId) {
		try {
			Company company = new Company();
			company.setComId(comId);
			
			Company comp = companyService.getCompany(company);
			 return new ResponseEntity(comp,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
}
