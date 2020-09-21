#!/usr/bin/env python
# coding: utf-8

# In[12]:


#!/usr/bin/env python
# coding: utf-8

# In[5]:
import sys
sys.path.append('..')
from dao.database import Database
import dao.config as config
import pandas as pd

# DB 연결
db = Database(config)

# 아이템, 유저 가져오기
def get_cfsource() :
    sql = "SELECT cust_id, stu_id, score "
    sql += "FROM review"
    result = db.run_query(sql)
    df = pd.DataFrame(result)
    return df

# 메인 추천 업체 가져오기
def get_reco_studio(studio_list) :
    result_list = []
    for stu_id in studio_list :
        sql = "SELECT s.stu_id, s.name, s.main_img, c.category_name, f.address, f.unit_price "
        sql += "FROM studio s "
        sql += "JOIN studio_filter f "
        sql += "ON s.stu_id = f.stu_id "
        sql += "JOIN studio_category c "
        sql += "ON s.category_id = c.category_id "
        sql += "WHERE s.stu_id = "+str(stu_id)

        result = db.run_query(sql)
        result_list.append(result[0])
    return result_list

# 메인 추천 업체 가져오기
def get_ranked_studio() :
    sql = "SELECT s.stu_id, s.name, c.category_name, f.address, f.unit_price, s.main_img "
    sql += "FROM studio s "
    sql += "JOIN studio_filter f "
    sql += "ON s.stu_id = f.stu_id "
    sql += "JOIN studio_category c "
    sql += "ON s.category_id = c.category_id "
    sql += "LEFT OUTER JOIN "
    sql += "(SELECT stu_id, COUNT(stu_id) count FROM reservation WHERE res_date > SUBDATE(NOW(), INTERVAL 1 MONTH) GROUP BY stu_id) res "
    sql += "ON s.stu_id = res.stu_id "
    sql += "order by res.count desc " 
    sql += "limit 8"

    result = db.run_query(sql)
    return result


# In[17]:

