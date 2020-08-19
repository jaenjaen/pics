package com.devils.pics.dao.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.devils.pics.dao.CustomerDAO;
import com.devils.pics.domain.Customer;

@Repository
public class CustomerDAOImpl implements CustomerDAO {

	@Autowired
	private SqlSession session;
	private final String ns = "CustomerMapper.";
	
	@Override
	public int registerCustomer(Customer Customer) throws Exception {
		return session.insert(ns+"registerCustomer",Customer);
	}
}
