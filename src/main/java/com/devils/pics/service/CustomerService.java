package com.devils.pics.service;

import com.devils.pics.domain.Customer;

public interface CustomerService {
	int registerCustomer(Customer customer) throws Exception;
	Customer getCustomer(String apiId) throws Exception;
	int updateCustomer(Customer customer) throws Exception;
	int deleteCustomer(int custId) throws Exception;
}

