#!/usr/bin/env python
# coding: utf-8

# ## 자연어 처리기로 데이터 셋 만들기

# In[1]:


# 데이터 핸들링 프레임
import numpy as np 
import pandas as pd
from pandas import DataFrame as df
import csv
import os

# 자연어 처리기
from konlpy.tag import Okt
from collections import Counter


# In[7]:


# 데이터 전처리 모델
class getDescTags:
    def __init__(self,n,dataset):
        self.n=n
        self.dataset = dataset

    # 1) description 다듬기 : 데이터 정규화, 맥락 위주로 자르고 명사만 가져오기, 글자길이는 1 ~ 7  
    def getDescList(self):
#         self.n=n
        okt=Okt()
        descList=[]
        for i in range(n):
            tempList=[]
            descript=(dataset.description[i]) # 한글자 이상만 뽑음
            descript=descript.replace("\n","")
            descript=descript.replace("\r","")
            descript=descript.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣AZ09]","")
            tempList=[j[0] for j in okt.pos(descript) if ((len(j[0])>1)& (len(j[0])<7)& (j[1]=="Noun"))]
            tempList=list(set(tempList))
            if len(tempList)>0:
                descList.append(tempList)
            else:
                descList.append(tempList)
        return descList



# In[2]:


get_ipython().system('jupyter nbconvert --to script nlp_model.ipynb ')


# In[ ]:





# In[ ]:




