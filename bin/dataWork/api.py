#!/usr/bin/env python
# coding: utf-8

# In[11]:


# 서버를 위한 import
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_restful import Resource, Api
from dao.reco_dao import get_reco_studio, get_ranked_studio

# 다른 component import
# from controller import data_controller as dc
from controller import reco_controller as rc
from controller import image_search_controller as ic

import os
from controller import tag_data_controller as td
from controller import tag_count_controller as tc

app = Flask(__name__, instance_relative_config=True)
cors = CORS(app, resources={r'*': {'origins': '*'}})

@app.route("/imageSearch", methods = ['POST'])
def image_search():
    if request.method == 'POST':
        img = request.files["image"]
        print(img)
        result = ic.get_stuIds_by_img(img, app.instance_path[:-18])
        return jsonify(result)
    
@app.route("/recommend/<cust_id>", methods = ['GET'])
def main_recommend(cust_id):
    if request.method == 'GET':
        result = rc.get_reco_studios(int(cust_id),app.instance_path[:-9])
        return jsonify(result)

@app.route("/recommend", methods = ['GET'])
def rank_recommend():
    if request.method == 'GET':
        result = rc.get_ranked_studios()
        return jsonify(result)
        
@app.route("/tag/<stuId>", methods = ['GET'])
def tag_count(stuId):
    if request.method == 'GET':
        result = tc.tagCount(int(stuId))
    return jsonify(result)
# 서버 정보(as properties)
if __name__ == "__main__":              
    app.run(host="127.0.0.1", port="5000")

