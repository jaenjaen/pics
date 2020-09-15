#!/usr/bin/env python
# coding: utf-8

# In[5]:


import pymysql
import pandas as pd


# In[82]:


#DB 접근
def get_cfsource() :
    db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
                             port=3306,
                             user='pics',
                             passwd='picspics!1',
                             db='pics',
                             charset='utf8',
                           cursorclass=pymysql.cursors.DictCursor)
    try :
        cursor= db.cursor()
        sql = "SELECT cust_id, stu_id, score "
        sql += "FROM review"

        cursor.execute(sql)
        db.commit()

        result = cursor.fetchall()
        df = pd.DataFrame(result)
        return df
    finally :
        db.close()


# In[83]:


# 메인 추천 업체 가져오기
def get_reco_studio(studio_list) :
    result_list = []
    db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
                                 port=3306,
                                 user='pics',
                                 passwd='picspics!1',
                                 db='pics',
                                 charset='utf8',
                               cursorclass=pymysql.cursors.DictCursor)
    try :
        for stu_id in studio_list :
            
            cursor= db.cursor()
            sql = "SELECT s.stu_id, s.name, s.main_img, c.category_name, f.address, f.unit_price "
            sql += "FROM studio s "
            sql += "JOIN studio_filter f "
            sql += "ON s.stu_id = f.stu_id "
            sql += "JOIN studio_category c "
            sql += "ON s.category_id = c.category_id "
            sql += "WHERE s.stu_id = "+str(stu_id)
            
            cursor.execute(sql)
            db.commit()

            result = cursor.fetchall()
            result_list.append(result[0])
        return result_list
    finally:
        db.close()


# In[11]:


# 메인 추천 업체 가져오기
def get_ranked_studio() :
    db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
                                 port=3306,
                                 user='pics',
                                 passwd='picspics!1',
                                 db='pics',
                                 charset='utf8',
                               cursorclass=pymysql.cursors.DictCursor)
    try :
        cursor= db.cursor()
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

        cursor.execute(sql)
        db.commit()

        result = cursor.fetchall()
        return result
    finally:
        db.close()


# In[1]:




# stu_id = 1156

# for i in range(20) : 
#     try :
#         sql = ""
#         db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
#                              port=3306,
#                              user='pics',
#                              passwd='picspics!1',
#                              db='pics',
#                              charset='utf8',
#                            cursorclass=pymysql.cursors.DictCursor)
#         cursor= db.cursor()
#         sql = "UPDATE studio "
#         sql += "set name = '"+name_list[random.randrange(0,166)]+"' "
#         sql += "WHERE stu_id ="+str(stu_id)

#         cursor.execute(sql)
#         db.commit()
#         stu_id += 1
#         db.close()
#     except :
#         print(error)
#     finally :
#         db.close()


# In[ ]:


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


# In[ ]:


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


# In[ ]:


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

