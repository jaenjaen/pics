#!/usr/bin/env python
# coding: utf-8

# In[1]:


# 외부 모듈
## 데이터 핸들링 프레임
import numpy as np 
import pandas as pd
from pandas import DataFrame as df
import csv
import os

### 자연어 처리기
from konlpy.tag import Okt
from collections import Counter

## wordVec
import gensim 
from gensim.models import word2vec


# In[17]:


### 사용자 모듈 불러오기
import sys
sys.path.append('..')
from dao import tag_dao
from model import nlp_model
from model import word2vec_model
from model import count_tag_model

# 데이터 불러오기
def tagData(stuId):
    # DB 데이터
    
    dataset = tag_dao.getTagData()
    dataset["description"].fillna("",inplace=True)
    
    # 자연어 처리
    CoreTagData1=nlp_model.getCoreTags1(dataset) # tag data1
    CoreTagData2=nlp_model.getCoreTags2(dataset) # tag data2
    
    for i in range(len(CoreTagData2)):
        if len(CoreTagData2[i])<1:
            CoreTagData2[i]=(CoreTagData1[i])

    for i in range(len(CoreTagData2)):
        CoreTagData2[i]=list(set(CoreTagData2[i]))
        CoreTagData1[i]=list(set(CoreTagData1[i])) 
  
    # dataset에 키워드 삽입
    dataset["new_tag1"]=CoreTagData1
    dataset["new_tag2"]=CoreTagData2
    
    
#     Word2Vec
    model=word2vec_model.wordVec(CoreTagData1)
    vocab=model.wv.vocab
    extendTagList=[]
    extendTagSimList=[]
    dataset=word2vec_model.extendTag(CoreTagData2,model,dataset)

#   Counting Words
    dataset=count_tag_model.tagCount(stuId,dataset)
    topSim=list(dataset.loc[:10,"stu_id"])
    return tag_dao.getTop10(topSim)[:10]


# In[19]:


# result=tagData(11) 
# result


# In[ ]:





# In[ ]:





# In[ ]:




