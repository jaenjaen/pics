package com.devils.pics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.ExtraDAO;
import com.devils.pics.service.ExtraService;

@Service
public class ExtraServiceImpl implements ExtraService {

	@Autowired
	private ExtraDAO extraDao;
}
