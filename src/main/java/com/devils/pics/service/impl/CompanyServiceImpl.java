package com.devils.pics.service.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.CompanyDAO;
import com.devils.pics.dao.CustomerDAO;
import com.devils.pics.domain.Company;
import com.devils.pics.domain.Customer;
import com.devils.pics.service.CompanyService;

@Repository
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyDAO companyDAO;

	public int registerCompany(Company company) throws Exception {
		return companyDAO.registerCompany(company);
	}

	@Override
	public Company loginCompany(Company company) throws Exception {
		return companyDAO.loginCompany(company);
	}

	@Override
	public int deleteCompany(String comId) throws Exception {
		return companyDAO.deleteCompany(comId);
	}

	@Override
	public int updateCompnay(Company company) throws Exception {
		return companyDAO.updateCompnay(company);
	}

	@Override
	public Company getCompany(Company company) throws Exception {
		return companyDAO.getCompany(company);
	}
	
	
}
