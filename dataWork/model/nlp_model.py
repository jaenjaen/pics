#!/usr/bin/env python
# coding: utf-8

# ## 자연어 처리기로 데이터 셋 만들기

# In[2]:


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


# In[14]:


# 데이터 전처리 모델
# 1) description 다듬기 : 데이터 정규화, 맥락 위주로 자르고 명사/형용사만 가져오기
# 글자길이는 1 자 이산 , 불용어 제외
def getDescList(dataset):
        n=len(dataset)
        okt=Okt()
        descList=[]
        stop_words=["문의","가능","가능합니다","요일","운영","마감","요일","시간",
                    "습니다","주세요","입니다","있는","메일","또는",
                    "아주","필요합니다","저희","일요일","주말","토요일","가능하며",
                    "있습니다","적합합니다","대여","좋겠습니다","무인","부터",
                    "또한","안녕하세요","마다","매우","어렵습니다","좋습니다",
                    "좋아요","있어서","있어요","조금","한번","까지","전화",
                    "평수","언제","아닌","대관","관련","다수","연락","무료",
                    "원하실","셀프","이용","오전","오후","없는",
                    "각종","원하시는","말씀","거나","있으니","있어","별도",
                    "가능하구요","있으며","발렛","발렛주차","직접",
                    "가능해서","없어서","없습니다","있구요","부탁드려요",
                    "부탁","부탁합니다","없으셔도","부탁드립니다",
                    "경우","발렛요금","주시","주시면","더욱더","거의","조율",
                    "최대","최소한","원하는","위치","최대한","원하시면",
                    "원하시는","가능하세요","아니라","원하신다면",
                    "위해","화장실","직원"]
        stop_words=list(set(stop_words))
        
        for i in range(n):
            tempList=[]
            descript=(dataset.loc[i,"description"]) # 한글자 이상만 뽑음
            descript=descript.replace("\n","")
            descript=descript.replace("\r","")
            descript=descript.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣AZ09]","")
            tempList=[j[0] for j in okt.pos(descript)
                       if((len(j[0])>1)
                          &((j[1]=="Adjective")|(j[1]=="Noun"))
                          &(j[0] not in stop_words))]
            tempList=list(set(tempList))
            descList.append(tempList)
        return descList


# In[17]:


# import sys
# sys.path.append('..')
# from dao import tag_dao

# dataset = tag_dao.getTagData()
# dataset["description"].fillna("",inplace=True)

# CoreTagData1=getCoreTags1(dataset)


# In[16]:





# In[4]:


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
            if len(trimList)>0:
                trimList=trimList.split(",")
            trimList=list(set(trimList))  # 리스트 안에서 중복되는 태그 삭제
        else:
            trimList=list(set(value))
        tags=trimList # 태그별로 자르기
        for tag in tags:
            if len(tag)>1:
                okt.pos(tag)  # 1개 태그 내 복합 명사 자르기
                for j in okt.nouns(tag):
                    if(len(j)>=2):
                        tempTagList.append(j)
        tempTagList=list(set(tempTagList))
        parseTagList.append(tempTagList)
    return parseTagList


# In[5]:


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


# In[6]:


## 3-2) 코어 태그 추출 (기존 태그 + description + coreTag )
def getCoreTags2(dataset):
    n=len(dataset)
    coreTagList=[]
    okt=Okt()    
    descript=getDescList(dataset) # 한글자 이상만 뽑음
    tags=getTagList(dataset)  # tag를 한번 더 파싱
    for k in range(len(descript)):
        coreTags=[]
         # 태그가 description 단어에도 있는지 확인
        for t in range(len(tags[k])):
            if (len(tags[k][t])>0) and (tags[k][t] in descript[k]):
                coreTags.append(tags[k][t])
        # 1) 태그 수가 없으면 디스크립션으로
        if (len(tags[k])<=3): 
            coreTagList.append(list(set(descript[k])))
        # 2) desc와 일치하는 태그(coreTag)가 적은데 기존 태그(tags[k])많으면 기존 태그 사용
        elif((len(coreTags)<=3)and(len(tags[k])>3)):
            coreTagList.append(tags[k])
        # 3) 디스크립션과 일치하는 태그가 많으면 일치태그 사용
        elif(len(coreTags)>3): 
            coreTagList.append(coreTags)
        else:
            coreTagList.append(list(set(descript[k]))) 
    return coreTagList


# In[7]:


# Tag2 데이터 보정 : Tag1의 데이터 갖다쓰기
def fillCoreTag(CoreTagData1,CoreTagData2,model):
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





# In[73]:





# In[ ]:




