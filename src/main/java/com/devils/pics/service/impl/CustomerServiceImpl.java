package com.devils.pics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.CustomerDAO;
import com.devils.pics.domain.Customer;
import com.devils.pics.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private CustomerDAO customerDao;

	@Override
	public int registerCustomer(Customer customer) throws Exception {
		return customerDao.registerCustomer(customer);
	}

	@Override
	public Customer getCustomer(int custId) throws Exception {
		return customerDao.getCustomer(custId);
	}

	@Override
	public int updateCustomer(Customer customer) throws Exception {
		return customerDao.updateCustomer(customer);
	}

	@Override
	public int deleteCustomer(int custId) throws Exception {
		return customerDao.deleteCustomer(custId);
	}
}
