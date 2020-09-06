#!/usr/bin/env python
# coding: utf-8

# In[29]:


import pymysql
import pandas as pd

#DB 접근
def get_cfsource() :
    db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
                         port=3306,
                         user='pics',
                         passwd='picspics!1',
                         db='pics',
                         charset='utf8',
                       cursorclass=pymysql.cursors.DictCursor)
    cursor= db.cursor()
    sql = "SELECT s.stu_id stuId, r.score score, r.cust_id custId "
    sql += "FROM studio s "
    sql += "LEFT OUTER JOIN studio_filter sf "
    sql += "ON s.stu_id = sf.stu_id "
    sql += "LEFT OUTER JOIN review r "
    sql += "ON s.stu_id = r.stu_id "
    sql += "UNION "
    sql += "SELECT r.stu_id studId, r.score score, cust.cust_id custId "
    sql += "FROM customer cust "
    sql += "LEFT OUTER JOIN review r "
    sql += "ON cust.cust_id = r.cust_id "

    cursor.execute(sql)
    db.commit()

    result = cursor.fetchall()
    db.close()
    df = pd.DataFrame(result)
    return df


