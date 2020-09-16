#!/usr/bin/env python
# coding: utf-8

# ## 모델 가동, 그 결과를 새로운 태그로 (extend_tag) 컬럼으로 저장

# In[ ]:


# word2Vec
import numpy as np 
import pandas as pd
from pandas import DataFrame as df
import os
import sys

import gensim 
from gensim.models import word2vec


# In[2]:


def wordVec(CoreTagData1):
    num_features =350    # Word vector dimensionality                      
    min_word_count =2   # Minimum word count                        
    num_workers = 2     # Number of threads to run in parallel
    context = 4          # Context window size                                                                                    
    downsampling = 1e-3  # Downsample setting for frequent words
#     dataset1=dataset

    model = gensim.models.Word2Vec(CoreTagData1, workers=num_workers, 
                              size=num_features, min_count = min_word_count,
                              window = context, sample = downsampling)
    return model 
# model=wordVec(CoreTagData1)


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

