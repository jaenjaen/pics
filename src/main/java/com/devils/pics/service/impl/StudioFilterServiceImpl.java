package com.devils.pics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.StudioFilterDAO;
import com.devils.pics.service.StudioFilterService;

@Service
public class StudioFilterServiceImpl implements StudioFilterService {
	
	@Autowired
	private StudioFilterDAO studioFilterDao;
}
