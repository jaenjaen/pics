#!/usr/bin/env python
# coding: utf-8

# In[1]:


# 외부 모듈
import pandas as pd
import numpy as np
import sys
sys.path.append('..')
from dao.reco_dao import get_reco_studio, get_ranked_studio

def get_reco_studios(cust_id, path):
    result = {'status':True, 'studios':[]}
    # 예측점수 테이블 가져오기
    df = pd.read_csv(path+'/resources/sim_table/sim_table.csv', encoding='utf-8', index_col = 0)
    # pivot회
    ratings_predicted = df.pivot_table(index= 'userId', columns='itemId', values='rate')
    # 리뷰했는지 확인
    if cust_id in ratings_predicted.index :
        pass
    else :
        result['status'] = False
        return result
    # userId 받고 해당 사람에게 8개 stuId 추출
    studio_list = ratings_predicted.loc[cust_id].sort_values(ascending=False)[:8].index
    # 해당 아이디에 맞는 studio 정보 받고 보내기
    studios = get_reco_studio(studio_list)
    # 대표 사진 하나만 가지고 갈 수 있도록
    for studio in studios:
        studio['main_img'] = studio.get('main_img').split(',')[0]
    result['studios']=studios
    return result


# In[2]:


def get_ranked_studios():
    studios = get_ranked_studio()
    for studio in studios:
        studio['main_img'] = studio.get('main_img').split(',')[0]
    return studios


# In[7]:

