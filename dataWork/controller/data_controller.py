#!/usr/bin/env python
# coding: utf-8

# In[25]:


import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
import pdb # for문 안에서 어떻게 진행되나 확인하는 것 -- about Debug

import numpy as np 
import os
import sys

sys.path.append('..')

from model import image_model as im

def predict(img,path):
    img.save(path[:-9]+'/resources/images/'+img.filename)
    
    #device 설정
    device = torch.device('cpu')
    
    #Hyperparameters
    num_epochs = 5
    num_classes = 10
    batch_size = 100
    learning_rate = 0.001
    
    #image loading, preprocessing
    trans = transforms.Compose([
        transforms.Resize((28,28)),
        transforms.ToTensor()
    ])
    testset = torchvision.datasets.ImageFolder(root=path[:-9]+'/resources', transform=trans)
    testloader = torch.utils.data.DataLoader(dataset=testset, batch_size=batch_size, shuffle=False)
        
    # 모델 초기화
    model = im.ConvNet()
    # 기존 weights 입력
    model.load_state_dict(torch.load(path[:-9]+'/model/weight/model_state_dict.pt',map_location=device))
    # 모델 실행
    model.eval()
        
    # 예측하기
    for image, label in testloader:
        image=image.to(device)
        outputs = model(image[:,:1])
        _,predicted=torch.max(outputs.data, 1)
        
    # 이미지 파일 삭제 (파일 존재 여부먼저 확인하는 게 좋을 것 같으나...)
    os.remove(path[:-9]+'/resources/images/'+img.filename)
        
    return str(predicted.numpy()[0])

