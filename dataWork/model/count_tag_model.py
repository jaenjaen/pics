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


# In[194]:


class getDescTags(dataset):
        def __init__(self, n, dataset):
        self.n = len(dataset)
        self.dataset = dataset
    
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

    ## dataset 자르고, 유사태그 빈도 세고, 다시 합치기
    def tagCount(n,dataset):
        target=dataset.iloc[n:n+1]
        rest=dataset[dataset.index != n]
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
                    cnt+=0.99
            for j in range(len(targetTag2List)):
                if targetTag2List[j] in restTag2List:
                    cnt+=1
            cnt=cnt/(len(targetExTagList))
            countKeyword.append(cnt)

        ## dataset에 열 추가
        rest["tagCount"]=countKeyword
        target["tagCount"]=0  # target은 아예 안 뜨도록 0으로 처리

        dataset=pd.concat([target,rest],ignore_index=True) # 다시 2개 합치기
        dataset=dataset.sort_values(by=['tagCount'],ascending=False)

        return dataset

