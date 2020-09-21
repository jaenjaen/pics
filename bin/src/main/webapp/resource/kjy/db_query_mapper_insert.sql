select * from studio;
select * from studio_filter;

select * from repeat_date;
--------------------------------------------
-- repeat_date insert
--------------------------------------------
-- stu_id 10
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('mon','17-19',10);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('tue','9-18',10);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('wed','9-18',10);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('thu','9-18',10);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('fri','9-13',10);

-- stu_id : 11
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('mon','11-23',11);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('tue','11-23',11);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('wed','11-23',11);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('thu','11-23',11);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('fri','11-23',11);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('sat','11-23',11);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('sun','11-23',11);

-- stu_id 12
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('mon','9-18',12);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('tue','9-18',12);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('wed','9-18',12);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('thu','9-18',12);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('fri','9-18',12);

-- stu_id 13
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('mon','0-24',13);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('tue','0-24',13);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('wed','0-24',13);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('thu','0-24',13);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('fri','0-24',13);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('sat','0-24',13);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('sun','0-24',13);

-- stu_id 15
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('mon','19-23',15);

INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('wed','19-23',15);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('thu','19-23',15);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('fri','19-23',15);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('sat','19-23',15);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('sun','19-23',15);

-- stu_id 14
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('mon','13-20',14);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('wed','9-21',14);
INSERT INTO repeat_date(weekday, time, stu_id) VALUES ('fri','17-23',14);

------------------------
-- exception_date
------------------------
select * from exception_date;
INSERT INTO exception_date(start_date, end_date,stu_id) VALUES ('2020-08-15','2020-08-17',10);
INSERT INTO exception_date(start_date, end_date,stu_id) VALUES ('2020-08-01','2020-08-08',11);
INSERT INTO exception_date(start_date, end_date,stu_id) VALUES ('2020-08-16','2020-08-16',15);

------------------------
-- reservation
------------------------
select * from reservation;

INSERT INTO reservation(cust_id, stu_id, start_date, end_date, total_price, res_date, total_people)
VALUES (1,10,'2020-08-15','2020-08-15',100000,'2020-07-31',5);
INSERT INTO reservation(cust_id, stu_id, start_date, end_date, total_price, res_date, total_people)
VALUES (3,10,'2020-08-10','2020-08-12',150000,'2020-07-27',10);
INSERT INTO reservation(cust_id, stu_id, start_date, end_date, total_price, res_date, total_people)
VALUES (4,10,'2020-08-10','2020-08-12',150000,'2020-07-25',12);





