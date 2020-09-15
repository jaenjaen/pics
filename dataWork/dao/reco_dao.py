#!/usr/bin/env python
# coding: utf-8

# In[3]:


import pymysql
import pandas as pd


# In[ ]:


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
    sql = "SELECT cust_id, stu_id, score "
    sql += "FROM review"

    cursor.execute(sql)
    db.commit()

    result = cursor.fetchall()
    db.close()
    df = pd.DataFrame(result)
    return df


# In[4]:


# data = pd.read_excel('review.xlsx', enconding='utf-8')
# data.rename({'studio_name':'stu_id'}, axis='columns', inplace=True)
# data[data.duplicated(['stu_id','cust_id'])]
# data.drop_duplicates(['stu_id','cust_id'], inplace=True)
# data.score = round(data.score,0)
# ratings = data.pivot_table(index='cust_id', columns='stu_id', values='score')
# ratings_d = data.pivot_table(index='cust_id', columns='stu_id', values='score')
# index_list = [i+1 for i in range(len(ratings.index))]
# ratings.index = np.arange(22, 42, 1)
# ratings.columns = np.arange(1156, 1176, 1)
# ratings.index.name = 'cust_id'
# ratings.columns.name = 'stu_id'
# ratings


# In[13]:


# from itertools import product
# id_combo=list(product(ratings.index, ratings.columns))
# res_id = 62
# for cust_id, stu_id in id_combo:
#     db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
#                      port=3306,
#                      user='pics',
#                      passwd='picspics!1',
#                      db='pics',
#                      charset='utf8',
#                    cursorclass=pymysql.cursors.DictCursor)
#     cursor= db.cursor()
#     sql = "INSERT INTO reservation(cust_id,stu_id,start_date,end_date,total_price,res_date,total_people) "
#     sql += "VALUES("
#     sql += str(cust_id)+", "
#     sql += str(stu_id)+", "
#     sql += "'2020-09-14', '2020-09-15', 100000, '2020-09-01', 10);"


#     cursor.execute(sql)
#     db.commit()
#     db.close()


# In[6]:


# from itertools import product
# id_combo=list(product(ratings.index, ratings.columns))
# res_id = 2485
# for cust_id, stu_id in id_combo:
#     score = ratings.loc[cust_id,stu_id]
#     if score > -1 :
#         db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
#                          port=3306,
#                          user='pics',
#                          passwd='picspics!1',
#                          db='pics',
#                          charset='utf8',
#                        cursorclass=pymysql.cursors.DictCursor)
#         cursor= db.cursor()
#         sql = "INSERT INTO review(cust_id, stu_id, res_id, score) "
#         sql += "VALUES( "
#         sql += str(cust_id)+", "
#         sql += str(stu_id)+", "
#         sql += str(res_id)+", "
#         sql += str(score) +"); "
#     else : 
#         continue

#     print(sql)
#     cursor.execute(sql)
#     db.commit()
#     db.close()
#     res_id += 1


