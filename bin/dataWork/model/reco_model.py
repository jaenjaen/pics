#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
from itertools import product
import surprise
from surprise.model_selection import cross_validate
from itertools import product
from math import sqrt

# user_selection
def user_selection(ratings):
    # (1) probability of selection
    tot_nan_u = ratings.isnull().sum().sum()
    prop_u = pd.DataFrame(ratings.isnull().sum(axis=1)/tot_nan_u, columns=['Pui'])
#     print("user total nan : {}" .format(tot_nan_u))


    #(2) select_user
    nrand = np.random.rand()
    prop_u['condition'] = nrand+prop_u['Pui']-1
    selected_u=prop_u[(prop_u['Pui']>prop_u['condition']) & (prop_u['condition']>=0)].index
#     print(prop_u)
#     print("seleced_u : {}" .format(selected_u))
    return selected_u


# In[2]:


# item_selection
def item_selection_injecton(ratings, selected_u,init_nan,theta, theta_d):
    flag = True
    result=[theta, flag]
    # (1) probability of selection
    for i in selected_u:
        tot_nan_i = ratings.isnull().sum().sum()
        candi_item = ratings.loc[i,:]
        down_df= ratings.loc[:,candi_item[candi_item.isnull()].index]
        down_df_T = np.transpose(down_df)
#         print(down_df_T)
        tot_nan_i = down_df_T.notnull().sum(axis=1).sum()
#         print("tot_nan : {}" .format(tot_nan_i))
        prop_i = pd.DataFrame(down_df_T.notnull().sum(axis=1)/tot_nan_i, columns=['Pij'])
        nrand = np.random.rand()
        prop_i['condition'] = nrand+prop_i['Pij']-1
        selected_i=prop_i[(prop_i['Pij']>prop_i['condition']) & (prop_i['condition']>=0)].index

#         print(prop_i)
        if len(selected_i)>0 :
            print('len : ',len(selected_i))
            ratings.loc[i,selected_i] = 2
            tot_nan = ratings.isnull().sum().sum()
            theta = tot_nan / init_nan
            result[0] = theta
            print("init : {}, tot : {}" .format(init_nan, tot_nan))
            if theta <= (1-theta_d) :
                result[1]=False
                break
            print("theta : {}" .format(theta))
    return result


# In[3]:


def injection(ratings, theta_d):
    init_nan = ratings.isnull().sum().sum()
    tot_nan = ratings.isnull().sum().sum()
    print("{}, {}" .format(init_nan, tot_nan))
    theta = tot_nan / init_nan
    print("theta : {}" .format(theta))
    while theta > (1-theta_d):
        selected_u = user_selection(ratings)
#         print("u : {}" .format(len(selected_u))
        if len(selected_u) > 0 :
            result=item_selection_injecton(ratings, selected_u, init_nan,theta, theta_d)
            theta = result[0]
            if(result[1]==False):
                break
#         print(theta)
    return ratings


# In[4]:


# 유사도 구하기 (코사인)
def get_cossine_similarity(u,v) :
    mask = np.isfinite(u) & np.isfinite(v) # nan = false로 출력, 그외 true로 출력하는 라이브러리
    u = u[mask]
    v= v[mask]
    
    uvdot = (u*v).sum()

    # 분모1
    norm1=(u**2).sum() # 각 요소에 대해 제곱하고 합함. np라서 가능
    norm2=(v**2).sum()

    score = uvdot/(np.sqrt(norm1)*np.sqrt(norm2))
    return score


# In[41]:


# 모든 유사도(cossine)

def get_cossine_similarity_table(ratings):
    index_combinations=list(product(ratings.index, repeat=2)) # repeat = n 씩 조합한다
    index_combinations

    similartiy_list = []
    for uname, vname in index_combinations:
        u ,v= ratings.loc[uname],ratings.loc[vname]
        score=get_cossine_similarity(u,v)
        similartiy = { #Json 형식
            'u':uname,
            'v':vname,
            'score':round(score,4)
        }
        similartiy_list.append(similartiy)
    similartiy_list = pd.DataFrame(similartiy_list)
    similartiy_table = pd.pivot_table(similartiy_list, index='u',columns='v',values='score')
    return similartiy_table


# In[48]:


# 한 개 에측점수 출력
def pred_score(item, user,ratings,table):
    # 2)
    neighbors_ratings=ratings[user].drop(index=item)

    # 유사도 가져오기 
    sim_table=table

    norminator = (neighbors_ratings * sim_table).sum().sum()
    denominator = sim_table.sum().sum()
    pred_score = norminator / denominator
    return round(pred_score,2)


# In[59]:


# 전체 예측점수 테이블 출력
def pred_scores(ratings,table):
    ratings_combinations = list(product(ratings.index, ratings.columns))
    rating_list = []
    for item, user in ratings_combinations:
        score = pred_score(item,user,ratings,table)
        rating_predict = {
            'user' : user,
            'item' : item,
            'score': score
        }
        rating_list.append(rating_predict)
    rating_list = pd.DataFrame(rating_list)
    rating_table = pd.pivot_table(rating_list,index='user',columns='item',values='score')
    return rating_table


# In[10]:


def back_to_df(ratings):
    index_combinations=list(product(ratings.index, ratings.columns)) # repeat = n 씩 조합한다
    index_combinations

    rating_list = []
    for user, item in index_combinations:
        score = ratings.loc[user, item]
        rating_json = {
            'userId' : user,
            'itemId' : item,
            'rate' : score
        }
        rating_list.append(rating_json)
    ratings_result = pd.DataFrame(rating_list)
    return ratings_result


# In[11]:


#rmse 측정
def get_rmse(ratings_r, ratings_p) :
    id_combo = list(product(ratings_r.index, ratings_r.columns))
    sum = 0
    cnt = 0
    for cust_id, stu_id in id_combo:
        r = ratings_r.loc[cust_id, stu_id]
        p = ratings_p.loc[cust_id, stu_id]
        if (r >-1) & (p > -1):
            sum += (r-p)**2
            cnt += 1
    var = sum / cnt
    rmse = sqrt(var)
    return rmse


# In[57]:


def get_predict_score_table(theta_d):
    '''
    theta_d : 총 결측치에서 몇 %만큼 Injection을 진행할 것인지에 대한 Hyper Parameter
    '''
    
    # DB에서 불러온 review source 받기
    data = reco_dao.get_cfsource()
    
    # 받은 data의 pivot table화
    ratings = data.pivot_table(index='cust_id', columns='stu_id', values='score')
    
    # injection 실행
    ratings_injected = injection(ratings, theta_d)
    
    # 유사도 테이블 생성
    sim_table = get_cossine_similarity_table(np.transpose(ratings_injected)) # item_based CF
    
    # 예측점수 테이블 생성
    ratings_predicted = pred_scores(np.transpose(ratings_injected), sim_table)
    # csv로 저장
    ratings_predicted.to_csv('../resources/sim_table/sim_table.csv', mode = 'w')
    
    #RMSE 출력
    ratings = data.pivot_table(index='cust_id', columns='stu_id', values='score')
    rmse = get_rmse(ratings, ratings_predicted)
    
    return rmse


# In[10]:


get_ipython().system('jupyter nbconvert --to script reco_model.ipynb ')


# In[62]:


theta_ds = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
rmse_list = []
for theta_d in theta_ds:
    rmse_list.append(get_predict_score_table(theta_d))
rmse_list


# In[ ]:




