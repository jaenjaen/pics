package com.devils.pics.service;

import com.devils.pics.domain.Company;

public interface CompanyService {
	int registerCompany(Company company) throws Exception;
	Company getCompany(Company company)throws Exception;
	Company loginCompany(Company company) throws Exception;
	int deleteCompany (String comId) throws Exception;
	int updateCompnay (Company company) throws Exception;
}

