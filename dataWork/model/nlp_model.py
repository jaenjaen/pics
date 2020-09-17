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
import sys

# 자연어 처리기
from konlpy.tag import Okt
from collections import Counter


# In[7]:


# 데이터 전처리 모델
# 1) description 다듬기 : 데이터 정규화, 맥락 위주로 자르고 명사만 가져오기, 글자길이는 1 ~ 7  
def getDescList(dataset):
    n=len(dataset)
    okt=Okt()
    descList=[]
    for i in range(n):
        tempList=[]
        descript=(dataset.loc[i,"description"]) # 한글자 이상만 뽑음
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


# In[ ]:


## 2) Tag 다듬기 : 복합명사로 이루어진 태그는 잘라서 길이 2~7 사이의 단어만 추출
def getTagList(dataset):
    n=len(dataset)
    parseTagList=[]
    okt=Okt()
    for i in range(n):
        tempTagList=[]
        value=dataset.loc[i,"tag_name"]
        if type(value)==str:
            trimList=value.replace(']','')
            trimList=trimList.replace('[','')
            trimList=trimList.replace("'",'')
            trimList=trimList.split(",")
            trimList=list(set(trimList))  # 리스트 안에서 중복되는 태그 삭제
        else:
            trimList=list(set(value))
        tags=trimList # 태그별로 자르기
        for tag in tags:
            if len(tag)>1:
                okt.pos(tag)  # 1개 태그 내 복합 명사 자르기
                for j in okt.nouns(tag):
                    if(len(j)>=2|len(j)<7):
                        tempTagList.append(j)
        tempTagList=list(set(tempTagList))
        parseTagList.append(tempTagList)
    return parseTagList


# In[ ]:


## 3-1) 코어 태그 추출 (태그, description 합집합)
def getCoreTags1(dataset):
    n=len(dataset)
    coreTagList1=[]
    okt=Okt()    
    coreTag=[]
    descript=getDescList(dataset) # 한글자 이상만 뽑음
    tags=getTagList(dataset)  # tag를 한번 더 파싱
    for i in range(len(descript)): 
        if (len(tags[i])>0): 
            coreTag.append(tags[i]+descript[i])
        else:
            coreTag.append(descript[i])
    coreTagList1.append(coreTag)
    CoreTagData1=coreTagList1
    CoreTagData1=CoreTagData1[0]
    return CoreTagData1


# In[ ]:


## 3-2) 코어 태그 추출 (부분적으로 기존 태그 + description + coreTag )
def getCoreTags2(dataset):
    n=len(dataset)
    coreTagList=[]
    okt=Okt()    
    descript=getDescList(dataset) # 한글자 이상만 뽑음
    tags=getTagList(dataset)  # tag를 한번 더 파싱
    for k in range(len(descript)):
        coreTags=[]
        for t in range(len(tags[k])):
            if (len(tags[k][t])>0)&(tags[k][t] in descript[k]): # 태그가 description 단어에도 있는지 확인
                coreTags.append(tags[k][t])
        if (len(tags[k])<=3): # 태그 수가 없으면 디스크립션으로
            coreTagList.append(list(set(descript[k])))
        elif((len(coreTags)<=3)&(len(tags[k])>3)):# desc와 일치하는 태그(coreTag)가 적은데 기존 태그(tags[k])많으면 기존 태그 사용
            coreTagList.append(tags[k])
        elif(len(coreTags)>3): # 디스크립션과 일치하는 태그가 많으면 일치태그 사용
            coreTagList.append(coreTags)
        else:
            coreTagList.append(list(set(descript[k]))) 
    return coreTagList


# In[ ]:


# Tag2 데이터 보정 : Tag1의 데이터 갖다쓰기
def fillCoreTag(CoreTagData1,CoreTagData2):
    for i in range(len(CoreTagData2)):
        if len(CoreTagData2[i])<1:
            CoreTagData2[i]=(CoreTagData1[i])

    for i in range(len(CoreTagData2)):
        CoreTagData2[i]=list(set(CoreTagData2[i]))
        CoreTagData1[i]=list(set(CoreTagData1[i]))
    
    ## dataset에 키워드 삽입
    dataset["new_tag1"]=CoreTagData1
    dataset["new_tag2"]=CoreTagData2
    return dataset 


# In[ ]:





# In[ ]:





# In[ ]:




