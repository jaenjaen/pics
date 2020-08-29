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
	public int registerCustomer(Customer customer) throws Exception {
		return session.insert(ns+"registerCustomer",customer);
	}

	@Override
	public Customer getCustomer(String custId) throws Exception {
		return session.selectOne(ns+"getCustomer",custId);
	}

	@Override
	public int updateCustomer(Customer customer) throws Exception {
		return session.update(ns+"updateCustomer",customer);
	}

	@Override
	public int deleteCustomer(int custId) throws Exception {
		return session.delete(ns+"deleteCustomer",custId);
	}
}
