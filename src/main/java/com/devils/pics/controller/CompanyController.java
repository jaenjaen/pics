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

import com.devils.pics.domain.Chat;
import com.devils.pics.domain.Company;
import com.devils.pics.service.CompanyService;
import com.devils.pics.util.security.JwtService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins={"*"})
@Api(tags= {"Pics Company-Customer"})
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	@Autowired
	private JwtService jwtService;
	
	
	@ApiOperation(value="업체 회원 가입")
	@PostMapping("/company")
	public ResponseEntity registerCustomer(@RequestBody Company company) {
		try {
			companyService.registerCompany(company);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}

	}
	
	@ApiOperation(value="업체 회원 로그인", response = Company.class)
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
	
	@ApiOperation(value="업체회원 정보 반환", response = Company.class)
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
	
	@ApiOperation(value="업체회원 정보 수정")
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
	
	@ApiOperation(value="업체회원 정보 삭제(탈퇴)")
	@DeleteMapping("/company/{comId}")
	public ResponseEntity deleteCustomer(@PathVariable String comId) {
		try {
			companyService.deleteCompany(comId);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@ApiOperation(value="업체회원이 소유한 studio정보를 담아 함께 반환", response = Company.class)
	@GetMapping("/companyifo/{comId}")
	public ResponseEntity getCompanyinfo(@PathVariable String comId) {
		System.out.println(comId+"로 검색 시작");
		try {
			Company comp = companyService.getCompanyInfo(comId);
			 return new ResponseEntity(comp,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		}
	}
	

}
