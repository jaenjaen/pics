package com.devils.pics.service;

import java.util.List;

import com.devils.pics.domain.Bookmark;
import com.devils.pics.domain.Studio;

public interface ExtraService {
	int addBookmark(Bookmark bookmark) throws Exception;
	List<Studio> getBookmark(int custId) throws Exception;
	int deleteBookmark(Bookmark bookmark) throws Exception;
}
