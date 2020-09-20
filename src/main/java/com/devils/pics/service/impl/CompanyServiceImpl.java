package com.devils.pics.service.impl;

import java.io.FileNotFoundException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.CompanyDAO;
import com.devils.pics.dao.CustomerDAO;
import com.devils.pics.domain.Company;
import com.devils.pics.domain.Customer;
import com.devils.pics.service.CompanyService;
import com.devils.pics.util.security.SaltUtil;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyDAO companyDAO;
	
	@Autowired
	private SaltUtil saltUtil;

	public int registerCompany(Company company) throws Exception {
		
		String password = company.getPassword();
        String salt = saltUtil.genSalt();
        company.setSalt(salt);
        company.setPassword(saltUtil.encodePassword(salt,password));
		return companyDAO.registerCompany(company);
	}

	@Override
	public Company loginCompany(Company company) throws Exception {
		Company comDao = companyDAO.loginCompany(company);
		if(comDao == null) throw new FileNotFoundException("존재하지 않는 업체입니다.");
		String salt = comDao.getSalt();
		String password = saltUtil.encodePassword(salt,company.getPassword());
		if(!comDao.getPassword().equals(password)) throw new FileNotFoundException ("비밀번호가 존재하지 않습니다.");
		return comDao;
	}

	@Override
	public int deleteCompany(String comId) throws Exception {
		return companyDAO.deleteCompany(comId);
	}

	@Override
	public int updateCompnay(Company company) throws Exception {
		Company comDao = companyDAO.loginCompany(company);
		String password = company.getPassword();
        String salt = comDao.getSalt();
        
        
        if (comDao.getPassword().equals(saltUtil.encodePassword(salt, password))) {
        	company.setSalt(salt);
        	company.setPassword(saltUtil.encodePassword(company.getSalt(),password));
        	return companyDAO.updateCompnay(company);
        }
        else {
        company.setSalt(saltUtil.genSalt());
        company.setPassword(saltUtil.encodePassword(company.getSalt(),password));
		return companyDAO.updateCompnay(company);
        }
	}

	@Override
	public Company getCompany(Company company) throws Exception {
		return companyDAO.getCompany(company);
	}

	@Override
	public Company getCompanyInfo(String comId) throws Exception {
		return companyDAO.getCompanyInfo(comId);
	}
	
	
}
