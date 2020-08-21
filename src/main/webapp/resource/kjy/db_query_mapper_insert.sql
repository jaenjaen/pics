-- company
INSERT
into company
VALUES ('1234','가','성동구','1234','010-1234-1234','desc','resources/img/1.png');

INSERT
into company
VALUES ('2234','나','광진구','1234','010-1234-1235','desc','resources/img/2.png');

INSERT
into company
VALUES ('3234','다','마포구','1234','010-1234-1236','desc','resources/img/3.png');

-- category
INSERT
into studio_category
VALUES(1,'사진방');

INSERT
into studio_category
VALUES(2,'세트장');

INSERT
into studio_category
VALUES(3,'일반공간');

-- studio
desc studio;
select * from studio;
INSERT
into studio
VALUES(1,'1234',1,'name1','desc1','rule1','resource/img/main1.png', 'resource/img/port2.png','resource/img/cad1.png',
 1);
 INSERT
into studio
VALUES(2,'2234',1,'name2','desc2','rule2','resource/img/main3.png', 'resource/img/port3.png','resource/img/cad3.png',
 2);
INSERT
into studio
VALUES(3,'1234',2,'name3','desc3','rule3','resource/img/main3.png', 'resource/img/port3.png','resource/img/cad3.png',
 3);
 -- studio_filter
 desc studio_filter;
INSERT
into studio_filter (filter_id, size, options, parking, unit_price, default_capacity,
excharge, address, max_capacity, stu_id)
VALUES(1,80,'option1', 3, 15000, 10, 10000, '성동구', 20, 1);

INSERT
into studio_filter (filter_id, size, options, parking, unit_price, default_capacity,
excharge, address, max_capacity, stu_id)
VALUES(2,100,'option1', 0, 10000, 5, 5000, '마포구', 10, 2);

INSERT
into studio_filter (filter_id, size, options, parking, unit_price, default_capacity,
excharge, address, max_capacity, stu_id)
VALUES(3,150,'option1', 0, 20000, 15, 15000, '광진구', 30,3);

select * from studio_filter;
 
-- api
desc loginapi;
insert
into loginapi
VALUES(0,'kakao');

insert
into loginapi
VALUES(1,'googe');

insert
into loginapi
VALUES(2,'naver');

insert
into loginapi
VALUES(3,'facebook');

-- customer
desc customer;
select * from customer;
INSERT
into customer
VALUES(1,1,'F',20,'학생','지인','encore@encore.com','010-0000-0001','A1B1C1','img');

INSERT
into customer
VALUES(2,0,'M',30,'개발자','인터넷','encore1@encore.com','010-0000-0002','A2B1C1','img');

-- review
desc review;
INSERT
into review
VALUES(1,1,1,5,'좋아요','resources/img/review1.png','2020-05-10','넵');

INSERT
into review
VALUES(3,1,2,4,'좋아요','resources/img/review3.png','2020-05-13','넵');

INSERT
into review
VALUES(2,2,1,2,'나빠요','resources/img/review2.png','2020-05-12','넵');

-- tag_dic
desc tag_dic;
select * from studio_filter;
INSERT into tag_dic
VALUES(1,1,'#도시');

INSERT into tag_dic
VALUES(2,2,'#도시');

INSERT into tag_dic
VALUES(3,3,'#농촌');

INSERT into tag_dic
VALUES(4,'3','#바다');

-- repeat_date
desc repeat_date;
select * from studio;
delete from repeat_date;
INSERT
into repeat_date
VALUES(1, '월', '9-18', 2);

INSERT
into repeat_date
VALUES(2, '월', '13-18', 3);

INSERT
into repeat_date
VALUES(3, '수', '9-12,13-18', 2);

INSERT
into repeat_date
VALUES(4, '금', '15-18', 2);

INSERT
into repeat_date
VALUES(5, '목', '9-18', 1);
-- exception_date
desc exception_date;
select * from exception_date;

INSERT 
into exception_date
VALUES(1,'2020-08-15','2020-08-17',2);

INSERT 
into exception_date
VALUES(2,'2020-08-15 13:00:00','2020-08-15 23:59:59',3);

insert into exception_date VALUES(3,'2020-08-13','2020-08-13',1);
