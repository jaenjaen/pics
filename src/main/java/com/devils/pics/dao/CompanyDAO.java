package com.devils.pics.dao;

import com.devils.pics.domain.Company;

public interface CompanyDAO {
	int registerCompany(Company company) throws Exception;
	Company getCompany(Company company)throws Exception;
	Company loginCompany(Company company) throws Exception;
	int deleteCompany (String comId) throws Exception;
	int updateCompnay (Company company) throws Exception;
}

