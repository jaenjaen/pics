#!/usr/bin/env python
# coding: utf-8

# In[1]:


import sys
sys.path.append('..')
from dao.database import Database
import dao.config as config


# In[2]:


# DB 연결
db = Database(config)


# In[76]:


def get_stuId_by_img(img_list) :
    studio_list = []
    count = 0
    for img_name in img_list:
        print("count : {}" .format(count))
        sql = "SELECT stu_id "
        sql += "FROM studio "
        sql += "WHERE main_img LIKE '%"+img_name+"%'"

        studios = db.run_query(sql)
        if studios:
            if len(studio_list) >0 :
                if studios[0]['stu_id'] in studio_list :
                    continue
                count+=1
                studio_list.append(studios[0]['stu_id'])
                if count == 5 :
                    break
            else :
                count+=1
                studio_list.append(studios[0]['stu_id'])
        if count == 5 :
            break

    return studio_list


# In[85]:

