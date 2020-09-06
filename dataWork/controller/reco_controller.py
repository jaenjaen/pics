#!/usr/bin/env python
# coding: utf-8

# In[13]:


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





