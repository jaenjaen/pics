#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pymysql
import pandas as pd
import numpy as np

#DB 에서 Studio, Tag 정보 가져오기
def getTagData() :
    # 정보 가져오기
    db= pymysql.connect(host='pics.crvbvpzlygpt.ap-northeast-2.rds.amazonaws.com',
                 port=3306,
                 user='pics',
                 passwd='picspics!1',
                 db='pics',
                 charset='utf8',
               cursorclass=pymysql.cursors.DictCursor)
    sqlStudio ="""SELECT 
            s.stu_id,s.com_id,s.category_id,s.name,s.description,s.rule,s.main_img,s.port_img,s.cad_img,s.floor
            FROM studio s;
            """
    sqlTag ="SELECT t.tag_id,t.stu_id,t.tag_name FROM tag t"

    cursor= db.cursor()

    cursor.execute(sqlStudio)
    db.commit()
    studio = cursor.fetchall()
    studio = pd.DataFrame(studio)

    cursor.execute(sqlTag)
    db.commit()
    tag = cursor.fetchall()
    tag = pd.DataFrame(tag)
    db.close()
    

    # 데이터 Tag 수정
    tagIdList=[]
    tagNameList=[]
    tag["tag_id"].fillna(0, inplace=True)
    tag["stu_id"].fillna(0, inplace=True)
    tag["tag_name"].fillna("", inplace=True)

    # 리스트로 쪼개기 처리
    for i in range(len(studio)):
        tagNames=[]
        tagIds=[]
        for t in range(len(tag)):
            if int(tag.iloc[t,1])==int(studio.iloc[i,0]):
                tagNames.append(tag.iloc[t,2])
                tagIds.append(tag.iloc[t,0])
        tagIdList.append(tagIds)
        tagNameList.append(tagNames)

    # str 처리    
    for i in range(len(tagNameList)):
        tagNameList[i]=tagNameList[i]
        tagIdList[i]=tagIdList[i]

    # studio 테이블에 추가
    studio["tag_id"]=tagIdList
    studio["tag_name"]=tagNameList
    
    dataset=studio
    
    return dataset 


# In[21]:




