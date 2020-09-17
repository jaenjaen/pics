#!/usr/bin/env python
# coding: utf-8

# In[22]:


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


# In[25]:


### 사용자 모듈 불러오기
import sys
sys.path.append('..')
from dao import tag_dao
from model import nlp_model
from model import word2vec_model

# 데이터 불러오기
def tagData():
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
    
    
#   Word2Vec
    model=word2vec_model.wordVec(CoreTagData1)
    vocab=model.wv.vocab
    extendTagList=[]
    extendTagSimList=[]
    dataset=word2vec_model.extendTag(CoreTagData2,model,dataset)
    
    # 파일 저장 
    dataset.to_csv('../resources/dataset/tag_data.csv',sep=',',na_rep='NaN',index =True,encoding='utf-8-sig')


# In[26]:


tagData() 


# In[ ]:


# result.save(path[:-9]+'/resources/images/'+img.filename)


# In[ ]:





# In[ ]:




