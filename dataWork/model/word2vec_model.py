#!/usr/bin/env python
# coding: utf-8

# ## 모델 가동, 그 결과를 새로운 태그로 (extend_tag) 컬럼으로 저장

# In[43]:


# word2Vec
import numpy as np 
import pandas as pd
from pandas import DataFrame as df
import os
import sys

import gensim 
from gensim.models import word2vec


# In[44]:


def wordVec(CoreTagData1):
    size_num =350    # Word vector dimensionality                      
    min_word_count =2   # Minimum word count                        
    num_workers = 2     # Number of threads to run in parallel
    context =4          # Context window size                                                                                    
    downsampling = 0.001  # Downsample setting for frequent words

    model = gensim.models.Word2Vec(CoreTagData1, 
                                   sg=1,
                                   workers=num_workers,
                                   size=size_num,
                                   min_count = min_word_count,
                                   window = context,
                                   sample = downsampling)
    return model


# In[45]:


# ### 사용자 모듈 불러오기
# sys.path.append('..')
# from dao import tag_dao
# from model import nlp_model

# # 데이터 불러오기
# # DB 데이터
# dataset = tag_dao.getTagData()
# dataset["description"].fillna("",inplace=True)

# # 자연어 처리
# CoreTagData1=nlp_model.getCoreTags1(dataset) # tag data1
# CoreTagData2=nlp_model.getCoreTags2(dataset) # tag data2


# In[47]:


# model=wordVec(CoreTagData1)
# model.wv.vocab
# model.wv.most_similar("이태원",topn=4)


# In[ ]:


def extendTag(CoreTagData2,model,dataset):
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
    
    return dataset
# dataset=extendTag(CoreTagData2)

