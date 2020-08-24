-- select
SELECT
s.stu_id, s.name, s.description, s.main_img,
s.category,
s.weekday, s.time,
s.start_date, s.end_date,
f.unit_price, f.tag,
ifnull((r.score),0) avg
FROM (
SELECT
s.stu_id, s.name, s.description, s.main_img,
c.category,
r.weekday, r.time,
e.start_date, e.end_date
FROM studio s
LEFT OUTER JOIN repeat_date r
ON s.stu_id = r.stu_id
LEFT OUTER JOIN exception_date e
ON s.stu_id = e.stu_id
LEFT OUTER JOIN studio_category c
ON s.category_id = c.category_id
) s
LEFT OUTER JOIN 
(SELECT 
f.unit_price, f.stu_id, t.tag
FROM studio_filter f
JOIN tag_dic t
ON f.filter_id = t.filter_id) f
ON f.stu_id = s.stu_id
LEFT OUTER JOIN review r
ON s.stu_id = r.stu_id
WHERE s.stu_id
GROUP BY s.stu_id;

SELECT
s.stu_id, s.name, s.description, s.main_img,
c.category_name,
r.weekday, r.time,
e.start_date, e.end_date,
t.tag
FROM studio s
LEFT OUTER JOIN repeat_date r
ON s.stu_id = r.stu_id
LEFT OUTER JOIN exception_date e
ON s.stu_id = e.stu_id
LEFT OUTER JOIN studio_category c
ON s.category_id = c.category_id
LEFT OUTER JOIN tag_dic t
ON t.stu_id = s.stu_id
ORDER BY stu_id;

select * from tag_dic;

SELECT
s.stu_id, s.name, s.description, s.main_img,
c.category_id, c.category_name,
com.name com_name,
r.weekday,
e.start_date, e.end_date,
t.tag_name,
f.unit_price, f.address,
ifnull(rv.avg,0) avg,
ifnull(res.count,0) count
FROM studio s
JOIN company com
ON s.com_id = com.com_id
JOIN studio_filter f
ON s.stu_id = f.stu_id
LEFT JOIN studio_category c
ON s.category_id = c.category_id
LEFT OUTER JOIN repeat_date r
ON s.stu_id = r.stu_id
LEFT OUTER JOIN exception_date e
ON s.stu_id = e.stu_id
LEFT OUTER JOIN tag t
ON s.stu_id = t.stu_id
LEFT OUTER JOIN
(SELECT
stu_id, AVG(score) avg
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
where s.stu_id <> All (select stu_id from exception_date where start_date < '2020-08-16' and end_date > '2020-08-16' )
group by s.stu_id
ORDER BY s.stu_id DESC;
select stu_id, count(stu_id) from reservation group by stu_id;
select * from exception_date ;
select * from studio s LEFT OUTER join exception_date e on s.stu_id = e.stu_id 
where s.stu_id <> (select stu_id from exception_date where start_date = '2020-08-30')
;
select e.stu_id, e.start_date from exception_date e RIGHT OUTER JOIN studio s on e.stu_id = s.stu_id where start_date = '2020-08-30';