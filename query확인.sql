select 						
s.stu_id,s.com_id,s.category_id,s.name,s.description,s.rule,
ctg.category_id,ctg.category_name,
com.name,com.logo_img,
sf.size,sf.options,sf.parking,sf.unit_price,sf.default_capacity,sf.excharge,
t.tag_id,t.tag
from studio s
join studio_category ctg on s.category_id=ctg.category_id
join company com on s.com_id=com.com_id
join studio_filter sf on s.stu_id=sf.stu_id
left join tag t on s.stu_id=t.stu_id
where s.stu_id=1;

-- select
-- re.review_id, re.cust_id, re.stu_id, re.content, re.img, re.reg_date, re.answer
-- from review re
-- where re.stu_Id=1 and re.cust_Id=1

-- select count(res.res_id)
-- from reservation res
-- group by res.stu_id
-- having res.stu_id=1;
