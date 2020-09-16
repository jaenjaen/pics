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
import pandas as pd

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

    
# #     Word2Vec
    model=word2vec_model.wordVec(CoreTagData1)
    vocab=model.wv.vocab
    extendTagList=[]
    extendTagSimList=[]
    for i in range(len(CoreTagData2)):
        tags=[]
        tagsSim=[]
        for j in range(len(CoreTagData2[i])):
            if((len(CoreTagData2[i])>25)):
                tags.append(CoreTagData2[i][j])
                tagsSim.append(0)
            if((CoreTagData2[i][j] in vocab.keys())&(len(CoreTagData2[i])>12)):
                for k in range(1):
                    tags.append(model.wv.most_similar(CoreTagData2[i][j],topn=1)[k][0])
                    tagsSim.append(model.wv.most_similar(CoreTagData2[i][j],topn=1)[k][1])
            elif((CoreTagData2[i][j] in vocab.keys())&(len(CoreTagData2[i])>5)):
                for k in range(3):
                    tags.append(model.wv.most_similar(CoreTagData2[i][j],topn=3)[k][0])
                    tagsSim.append(model.wv.most_similar(CoreTagData2[i][j],topn=3)[k][1])
            elif((CoreTagData2[i][j] in vocab.keys())&(len(CoreTagData2[i])<=4)):
                for k in range(4):
                    tags.append(model.wv.most_similar(CoreTagData2[i][j],topn=4)[k][0])                    
                    tagsSim.append(model.wv.most_similar(CoreTagData2[i][j],topn=4)[k][1])
        extendTagList.append(tags)
        extendTagSimList.append(tagsSim) 
    dataset["extend_tag"]=extendTagList
    dataset["extend_tag_sim"]=extendTagSimList

    stuId=1
    
#   Counting Words
    dataset=count_tag_model.tagCount(stuId,dataset)
    dataset10=dataset.loc[:10,:]
    
    return dataset10


# In[18]:


tagData()


# In[4]:


# # 데이터 전처리 모델
# # 1) description 다듬기 : 데이터 정규화, 맥락 위주로 자르고 명사만 가져오기, 글자길이는 1 ~ 7  
# def getDescList(dataset):
#     n=len(dataset)
#     okt=Okt()
#     descList=[]
#     for i in range(n):
#         tempList=[]
#         descript=(dataset.loc[i,"description"]) # 한글자 이상만 뽑음
#         descript=descript.replace("\n","")
#         descript=descript.replace("\r","")
#         descript=descript.replace("[^ㄱ-ㅎㅏ-ㅣ가-힣AZ09]","")
#         tempList=[j[0] for j in okt.pos(descript) if ((len(j[0])>1)& (len(j[0])<7)& (j[1]=="Noun"))]
#         tempList=list(set(tempList))
#         if len(tempList)>0:
#             descList.append(tempList)
#         else:
#             descList.append(tempList)
#     return descList


# In[5]:


# ## 2) Tag 다듬기 : 복합명사로 이루어진 태그는 잘라서 길이 2~7 사이의 단어만 추출
# def getTagList(dataset):
#     n=len(dataset)
#     parseTagList=[]
#     okt=Okt()
#     for i in range(n):
#         tempTagList=[]
#         value=dataset.loc[i,"tag_name"]
#         if type(value)==str:
#             trimList=value.replace(']','')
#             trimList=trimList.replace('[','')
#             trimList=trimList.replace("'",'')
#             trimList=trimList.split(",")
#             trimList=list(set(trimList))  # 리스트 안에서 중복되는 태그 삭제
#         else:
#             trimList=list(set(value))
#         tags=trimList # 태그별로 자르기
#         for tag in tags:
#             if len(tag)>1:
#                 okt.pos(tag)  # 1개 태그 내 복합 명사 자르기
#                 for j in okt.nouns(tag):
#                     if(len(j)>=2|len(j)<7):
#                         tempTagList.append(j)
#         tempTagList=list(set(tempTagList))
#         parseTagList.append(tempTagList)
#     return parseTagList


# In[6]:


# ## 3-1) 코어 태그 추출 (태그, description 합집합)
# def getCoreTags1(dataset):
#     n=len(dataset)
#     coreTagList1=[]
#     okt=Okt()    
#     coreTag=[]
#     descript=getDescList(dataset) # 한글자 이상만 뽑음
#     tags=getTagList(dataset)  # tag를 한번 더 파싱
#     for i in range(len(descript)): 
#         if (len(tags[i])>0): 
#             coreTag.append(tags[i]+descript[i])
#         else:
#             coreTag.append(descript[i])
#     coreTagList1.append(coreTag)
#     CoreTagData1=coreTagList1
#     CoreTagData1=CoreTagData1[0]
#     return CoreTagData1

# CoreTagData1=getCoreTags1(dataset)


# In[7]:


# ## 3-2) 코어 태그 추출 (부분적으로 기존 태그 + description + coreTag )
# def getCoreTags2(dataset):
#     n=len(dataset)
#     coreTagList=[]
#     okt=Okt()    
#     descript=getDescList(dataset) # 한글자 이상만 뽑음
#     tags=getTagList(dataset)  # tag를 한번 더 파싱
#     for k in range(len(descript)):
#         coreTags=[]
#         for t in range(len(tags[k])):
#             if (len(tags[k][t])>0)&(tags[k][t] in descript[k]): # 태그가 description 단어에도 있는지 확인
#                 coreTags.append(tags[k][t])
#         if (len(tags[k])<=3): # 태그 수가 없으면 디스크립션으로
#             coreTagList.append(list(set(descript[k])))
#         elif((len(coreTags)<=3)&(len(tags[k])>3)):# desc와 일치하는 태그(coreTag)가 적은데 기존 태그(tags[k])많으면 기존 태그 사용
#             coreTagList.append(tags[k])
#         elif(len(coreTags)>3): # 디스크립션과 일치하는 태그가 많으면 일치태그 사용
#             coreTagList.append(coreTags)
#         else:
#             coreTagList.append(list(set(descript[k]))) 
#     return coreTagList

# CoreTagData2=getCoreTags2(dataset)


# In[8]:


# # Tag2 데이터 보정 : Tag1의 데이터 갖다쓰기
# def fillCoreTag(CoreTagData1,CoreTagData2):
#     for i in range(len(CoreTagData2)):
#         if len(CoreTagData2[i])<1:
#             CoreTagData2[i]=(CoreTagData1[i])

#     for i in range(len(CoreTagData2)):
#         CoreTagData2[i]=list(set(CoreTagData2[i]))
#         CoreTagData1[i]=list(set(CoreTagData1[i]))
#     ## dataset에 키워드 삽입
#     dataset["new_tag1"]=CoreTagData1
#     dataset["new_tag2"]=CoreTagData2
#     return dataset 
# dataset=fillCoreTag(CoreTagData1,CoreTagData2)


# ## Word2Vec

# In[9]:


# def wordVec(CoreTagData1):
#     num_features =350    # Word vector dimensionality                      
#     min_word_count =2   # Minimum word count                        
#     num_workers = 2     # Number of threads to run in parallel
#     context = 4          # Context window size                                                                                    
#     downsampling = 1e-3  # Downsample setting for frequent words
#     dataset1=dataset

#     model = gensim.models.Word2Vec(CoreTagData1, workers=num_workers, 
#                               size=num_features, min_count = min_word_count,
#                               window = context, sample = downsampling)
#     return model 
# model=wordVec(CoreTagData1)


# In[10]:


# def extendTag(CoreTagData2,model):
#     vocab=model.wv.vocab
#     extendTagList=[]
#     extendTagSimList=[]
#     for i in range(len(CoreTagData2)):
#         tags=[]
#         tagsSim=[]
#         for j in range(len(CoreTagData2[i])):
#             if((len(CoreTagData2[i])>25)):
#                 tags.append(CoreTagData2[i][j])
#                 tagsSim.append(0)
#             if((CoreTagData2[i][j] in vocab.keys())&(len(CoreTagData2[i])>12)):
#                 for k in range(1):
#                     tags.append(model.wv.most_similar(CoreTagData2[i][j],topn=1)[k][0])
#                     tagsSim.append(model.wv.most_similar(CoreTagData2[i][j],topn=1)[k][1])
#             elif((CoreTagData2[i][j] in vocab.keys())&(len(CoreTagData2[i])>5)):
#                 for k in range(3):
#                     tags.append(model.wv.most_similar(CoreTagData2[i][j],topn=3)[k][0])
#                     tagsSim.append(model.wv.most_similar(CoreTagData2[i][j],topn=3)[k][1])
#             elif((CoreTagData2[i][j] in vocab.keys())&(len(CoreTagData2[i])<=4)):
#                 for k in range(4):
#                     tags.append(model.wv.most_similar(CoreTagData2[i][j],topn=4)[k][0])                    
#                     tagsSim.append(model.wv.most_similar(CoreTagData2[i][j],topn=4)[k][1])
#         extendTagList.append(tags)
#         extendTagSimList.append(tagsSim) 
#     dataset["extend_tag"]=extendTagList
#     dataset["extend_tag_sim"]=extendTagSimList
    
#     return dataset
# dataset=extendTag(CoreTagData2)


# In[ ]:





# In[11]:


# def strToList(value):
#     if type(value)==str:
#         trimList=value.replace(']','')
#         trimList=trimList.replace('[','')
#         trimList=trimList.replace("'",'')
#         trimList=trimList.split(",")
#         trimList=list(set(trimList))  # 리스트 안에서 중복되는 태그 삭제
#     else:
#         trimList=list(set(value))
#     return trimList


# In[ ]:





# In[12]:


# def tagCount(stuId,dataset):
#     target=dataset.iloc[stuId:stuId+1]
#     rest=dataset[dataset.index != stuId]
#     #임의로 1개 선택
#     countKeyword=[]
#     for i in range(len(dataset)-1):
#         cnt=0
#         targetExTagList=strToList(target["extend_tag"].values[0])
#         restTagExList=strToList(rest.iloc[i]["extend_tag"])
#         targetTag2List=strToList(target["new_tag2"].values[0])
#         restTag2List=strToList(rest.iloc[i]["new_tag2"])
#         for j in range(len(targetExTagList)):
#             if targetExTagList[j] in restTagExList:
#                 cnt+=0.99
#         for j in range(len(targetTag2List)):
#             if targetTag2List[j] in restTag2List:
#                 cnt+=1
#         if len(targetExTagList)!=0:
#             cnt=cnt/(len(targetTag2List))
#             countKeyword.append(cnt)

#     ## dataset에 열 추가
#     rest["tagCount"]=countKeyword
#     target["tagCount"]=0  # target은 아예 안 뜨도록 0으로 처리

#     dataset=pd.concat([target,rest],ignore_index=True) # 다시 2개 합치기
#     dataset=dataset.sort_values(by=['tagCount'],ascending=False)
#     return dataset

# dataset=tagCount(stuId,dataset)


# In[ ]:





# In[ ]:




