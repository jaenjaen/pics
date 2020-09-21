#!/usr/bin/env python
# coding: utf-8

# In[11]:


# 외부 모듈
## 데이터 핸들링 프레임
import numpy as np 
import pandas as pd
from pandas import DataFrame as df
import csv
import os


# In[40]:


### 사용자 모듈 불러오기
import sys
sys.path.append('..')
from dao import tag_dao
from model import count_tag_model

# 데이터 불러오기
def tagCount(stuId):
    # tag_data-controller에서 추출한 데이터 csv 가져오기
    file_path=os.getcwd()
    file_path=file_path.replace("\\",'/')
    dataset = pd.read_csv(file_path+"/resources/dataset/tag_data.csv",encoding='utf-8')
    
    # Counting Words
    dataset=count_tag_model.tagCount(stuId,dataset)
    topSim=list(dataset.loc[:8,"stu_id"])
    return tag_dao.getTop8(topSim)[:8]


# In[42]:


# result=tagCount(11) 
# result


# In[ ]:





# In[ ]:





# In[ ]:




