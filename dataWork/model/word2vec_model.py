#!/usr/bin/env python
# coding: utf-8

# ## 모델 가동, 그 결과를 새로운 태그로 (extend_tag) 컬럼으로 저장

# In[ ]:


# word2Vec
import numpy as np 
import pandas as pd
from pandas import DataFrame as df
import os

import gensim 
from gensim.models import word2vec


# In[ ]:


class getDescTags(dataset):
    def __init__(self, n,CoreTagDate1, CoreTagDate2):
    self.n = len(dataset)
    self.dataset = dataset
    
    def wordVec(CoreTagDate1):
    num_features =350    # Word vector dimensionality                      
    min_word_count =2   # Minimum word count                        
    num_workers = 2     # Number of threads to run in parallel
    context = 4          # Context window size                                                                                    
    downsampling = 1e-3  # Downsample setting for frequent words
    dataset1=dataset

    model = gensim.models.Word2Vec(CoreTagData1, workers=num_workers, 
                              size=num_features, min_count = min_word_count,
                              window = context, sample = downsampling)
       
    def extendTag(CoreTagDate2):
    vocab=model.wv.vocab
    extendTagList=[]
    extendTagSimList=[]
    for i in range(len(CoreTagDate2)):
        tags=[]
        tagsSim=[]
        for j in range(len(CoreTagDate2[i])):
            if((len(CoreTagDate2[i])>25)):
                tags.append(CoreTagDate2[i][j])
                tagsSim.append(0)
            if((CoreTagDate2[i][j] in vocab.keys())&(len(CoreTagDate2[i])>12)):
                for k in range(1):
                    tags.append(model.wv.most_similar(CoreTagDate2[i][j],topn=1)[k][0])
                    tagsSim.append(model.wv.most_similar(CoreTagDate2[i][j],topn=1)[k][1])
            elif((CoreTagDate2[i][j] in vocab.keys())&(len(CoreTagDate2[i])>5)):
                for k in range(3):
                    tags.append(model.wv.most_similar(CoreTagDate2[i][j],topn=3)[k][0])
                    tagsSim.append(model.wv.most_similar(CoreTagDate2[i][j],topn=3)[k][1])
            elif((CoreTagDate2[i][j] in vocab.keys())&(len(CoreTagDate2[i])<=4)):
                for k in range(4):
                    tags.append(model.wv.most_similar(CoreTagDate2[i][j],topn=4)[k][0])                    
                    tagsSim.append(model.wv.most_similar(CoreTagDate2[i][j],topn=4)[k][1])
        extendTagList.append(list(set(tags)))
        extendTagSimList.append(list(set(tagsSim)))
        
    dataset["extend_tag"]=extendTagList[0]
    dataset["extend_tag_sim"]=extendTagSimList[1]
    return dataset

