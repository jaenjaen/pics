
SELECT
		s.stu_id, s.name, s.description, s.main_img,
		c.category_id, c.category_name,
		com.name com_name,
		r.weekday,
		e.start_date, e.end_date,
		t.tag_name,
		f.unit_price, f.address,
		ifnull(rv.avg,0) avg, rv.cntRev cntRev,
		ifnull(res.count,0) count,
        b.book_id
		FROM studio s
		JOIN company com
		ON s.com_id = com.com_id
		LEFT OUTER JOIN studio_filter f
		ON s.stu_id = f.stu_id
		LEFT OUTER JOIN studio_category c
		ON s.category_id = c.category_id
		LEFT OUTER JOIN repeat_date r
		ON s.stu_id = r.stu_id
		LEFT OUTER JOIN exception_date e
		ON s.stu_id = e.stu_id
		LEFT OUTER JOIN tag t
		ON s.stu_id = t.stu_id
		LEFT OUTER JOIN
		(SELECT
		stu_id, AVG(score) avg, COUNT(stu_id) cntRev
		FROM review
		GROUP BY stu_id
		) rv
		ON s.stu_id = rv.stu_id
		LEFT OUTER JOIN
		(SELECT
		stu_id, COUNT(stu_id) count
		FROM reservation
		GROUP BY stu_id
		) res
		ON s.stu_id = res.stu_id
        LEFT OUTER JOIN bookmark b
        ON s.stu_id = b.stu_id;

select * from studio;
select * from studio_filter;
select * from bookmark where cust_id=3;
