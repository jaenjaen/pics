package com.devils.pics.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devils.pics.dao.ExtraDAO;
import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Studio;
import com.devils.pics.service.ExtraService;

@Service
public class ExtraServiceImpl implements ExtraService {

	@Autowired
	private ExtraDAO extraDao;

	@Override
	public int addBookmark(Bookmark bookmark) throws Exception {
		return extraDao.addBookmark(bookmark);
	}

	@Override
	public List<Studio> getBookmark(int custId) throws Exception {
		return extraDao.getBookmark(custId);
	}

	@Override
	public int deleteBookmark(Bookmark bookmark) throws Exception {
		return extraDao.deleteBookmark(bookmark);
	}
}
