
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
        ON s.stu_id = b.stu_id
group by s.stu_id;

select * from studio;
select * from studio_filter;
select * from bookmark where cust_id=3 and stu_id = 10;
select * from studio_category;

SELECT s.stu_id, r.score, r.cust_id
FROM studio s
LEFT OUTER JOIN studio_filter sf
ON s.stu_id = sf.stu_id
LEFT OUTER JOIN review r
ON s.stu_id = r.stu_id
UNION
SELECT r.stu_id, r.score, cust.cust_id
FROM customer cust
LEFT OUTER JOIN review r
ON cust.cust_id = r.cust_id
;
SELECT s.stu_id, r.score, r.cust_id
FROM studio s
LEFT OUTER JOIN studio_filter sf
ON s.stu_id = sf.stu_id
LEFT OUTER JOIN review r
ON s.stu_id = r.stu_id;
SELECT r.stu_id, r.score, cust.cust_id
FROM customer cust
LEFT OUTER JOIN review r
ON cust.cust_id = r.cust_id
order by cust_id;

select * from customer;

select * from studio where main_img = '0_0_must_be.jpg';
update studio set main_img = '0_0_must_be.jpg' where main_img = '0_0_must_be.jpg';
select * from company;

-- ------------------------------
select * from studio;



SELECT s.stu_id, s.name, c.category_name, f.address, f.unit_price, s.main_img, ifnull(res.count,0)
FROM studio s 
JOIN studio_filter f
ON s.stu_id = f.stu_id
JOIN studio_category c
ON s.category_id = c.category_id
LEFT OUTER JOIN
(SELECT
stu_id, COUNT(stu_id) count
FROM reservation
WHERE res_date > SUBDATE(NOW(), INTERVAL 1 MONTH)
GROUP BY stu_id
) res
ON s.stu_id = res.stu_id
order by res.count desc
limit 8
;

select * from customer;
