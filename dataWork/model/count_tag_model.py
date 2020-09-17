#!/usr/bin/env python
# coding: utf-8

# In[1]:


# 데이터 핸들링 프레임
import numpy as np 
import pandas as pd
from pandas import DataFrame as df
import csv
import os
import sys


# In[3]:


# 문자열로 저장된 태그 리스트로 변환
def strToList(value):
    if type(value)==str:
        trimList=value.replace(']','')
        trimList=trimList.replace('[','')
        trimList=trimList.replace("'",'')
        trimList=trimList.split(",")
        trimList=list(set(trimList))  # 리스트 안에서 중복되는 태그 삭제
    else:
        trimList=list(set(value))
    return trimList


# In[2]:


## dataset 자르고, 유사태그 빈도 세고, 다시 합치기
def tagCount(stuId,dataset):
    target=dataset.iloc[stuId:stuId+1]
    rest=dataset[dataset.index != stuId]
    #임의로 1개 선택
    countKeyword=[]
    for i in range(len(dataset)-1):
        cnt=0
        targetExTagList=strToList(target["extend_tag"].values[0])
        restTagExList=strToList(rest.iloc[i]["extend_tag"])
        targetTag2List=strToList(target["new_tag2"].values[0])
        restTag2List=strToList(rest.iloc[i]["new_tag2"])
        for j in range(len(targetExTagList)):
            if targetExTagList[j] in restTagExList:
                cnt+=0.98
        for j in range(len(targetTag2List)):
            if targetTag2List[j] in restTag2List:
                cnt+=1
        if len(targetExTagList)!=0:
            cnt=cnt/(len(targetTag2List))
            countKeyword.append(cnt)

    ## dataset에 열 추가
    rest.loc[:,"tagCount"]=countKeyword
    target.loc[:,"tagCount"]=0  # target은 아예 안 뜨도록 0으로 처리

    dataset=pd.concat([target,rest],ignore_index=True) # 다시 2개 합치기
    dataset=dataset.sort_values(by=['tagCount'],ascending=False)
        
    return dataset


# In[ ]:





# In[ ]:




