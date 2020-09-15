#!/usr/bin/env python
# coding: utf-8

# In[ ]:


# 외부 모듈
import pandas as pd
# 사용자 모듈 불러오기
import sys
sys.path.append('..')
from dao import reco_dao
def recommend():
    # DB에서 불러온 source 받기
    df = reco_dao.get_cfsource()
    return df.iat[2,1] # 서버에서 받는지 확인용.... df가 진짜 리턴값


# In[1]:


import pandas as pd
import numpy as np

import sys
sys.path.append('..')
from model.reco_model import *


# In[2]:




data = pd.read_excel('review.xlsx', enconding='utf-8')
data.rename({'studio_name':'stu_id'}, axis='columns', inplace=True)
data[data.duplicated(['stu_id','cust_id'])]
data.drop_duplicates(['stu_id','cust_id'], inplace=True)
data.score = round(data.score,0)


# In[3]:



ratings = data.pivot_table(index='cust_id', columns='stu_id', values='score')
index_list = [i+1 for i in range(len(ratings.index))]
ratings.index = index_list
ratings.columns = index_list
ratings.index.name = 'cust_id'
ratings.columns.name = 'stu_id'
ratings.head()
# ratings.isnull().sum().sum()


# In[4]:


ratings_i=injection(ratings, 0.2)


# In[ ]:


ratings


# In[ ]:


table=get_cossine_similarity_table(ratings_i)
ratings_p = pred_scores(ratings_i, table)


# In[ ]:


ratings_p.iloc[6:15]


# In[ ]:


ratings_i.iloc[6:15]


# In[ ]:



# from itertools import product
# import surprise
# from surprise.model_selection import cross_validate
# data = pd.read_excel("test_reco2.xlsx", encoding='utf-8')
# data = surprise.Dataset.load_builtin('ml-100k')
# df = pd.DataFrame(data.raw_ratings, columns=["user", "item", "rate", "id"])
# ratings = df.pivot_table(index='user', columns='item', values='rate')
# ratings_s = ratings.iloc[:20,:40]


# In[ ]:


get_ipython().system('jupyter nbconvert --to script reco_controller.ipynb ')


# In[ ]:


# #surprise 모듈 사용


# reader = surprise.Reader(rating_scale=(1,5))
# ds = surprise.Dataset.load_from_df(ratings_r.loc[:,['user','item', 'score']],reader)

# sim_options = {'name':'cossine',
#               'user_based':False}
# # sim_options = {'name':'pearson'}
# # algo = surprise.KNNBasic(sim_options=sim_options)
# algo = surprise.KNNBasic(sim_options=sim_options)
# print(cross_validate(algo, ds)['test_rmse'].mean())
# ds_set = ds.build_full_trainset()
# algo.fit(ds_set)

# # index_combinations=list(product(final['userId'], final['itemId'])) # repeat = n 씩 조합한다
# # index_combinations
# # for userId, itemId in index_combinations:
# # #     print(type(userId),itemId)
# # #     predict_list = []
# #     predict_rate = algo.predict(userId, itemId).est
# # #     print(algo.predict(userId,itemId).est, algo.predict(userId,itemId).details.get('was_impossible'))
# #     predict_dic = {
# #         'userId':userId,
# #         'itemId':itemId,
# #         'rate': predict_rate
# #     }
# #     predict_list.append(predict_dic)
# # predict_list
# # rating_result = pd.DataFrame(predict_list)
# # rating_result


# In[ ]:


# # (4) CF 진행
# reader = surprise.Reader(rating_scale=(1,5))
# ds = surprise.Dataset.load_from_df(compare.loc[:,['userId','itemId', 'rate']],reader)

# sim_options = {'name':'pearson',
#               'user_based':False}
# # sim_options = {'name':'pearson'}
# # algo = surprise.KNNBasic(sim_options=sim_options)
# algo = surprise.KNNBasic(sim_options=sim_options)
# print(cross_validate(algo, ds)['test_rmse'].mean())
# ds_set = ds.build_full_trainset()
# algo.fit(ds_set)
# # for i in ratings.index:
# #     for j in ratings.columns:
# #         print("{}" .format(algo.predict(i,j)))

