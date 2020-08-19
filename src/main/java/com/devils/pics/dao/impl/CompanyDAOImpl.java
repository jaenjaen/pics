package com.devils.pics.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.CompanyDAO;
import com.devils.pics.dao.CustomerDAO;
import com.devils.pics.domain.Company;
import com.devils.pics.domain.Customer;

@Repository
public class CompanyDAOImpl implements CompanyDAO {

	@Autowired
	private SqlSession session;
	private final String ns = "CompanyMapper.";
	@Override
	public int registerCompany(Company company) throws Exception {
		return session.insert(ns+"registerCompany",company);
	}
}
