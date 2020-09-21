#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
import pdb # for문 안에서 어떻게 진행되나 확인하는 것 -- about Debug

import numpy as np 
import matplotlib.pyplot as plt

# 모델 껍데기
class ConvNet(nn.Module) :
  def __init__(self, num_classes=10):
    super(ConvNet, self).__init__()
    # CL, ML, FL 등이 선형적으로 연결됨 --> sequential
    # sequential 써도 되고... 따로 만들어도 되고
    # 튜토리얼 : pytorch nn.conv2d 검색
    self.layer1 = nn.Sequential(
      nn.Conv2d(1,16,kernel_size=5,stride=1,padding=2),
      nn.ReLU()
    )# (28*28*16)
    self.layer2 = nn.MaxPool2d(kernel_size=2,stride=2) # (14*14*16)
    self.layer3 = nn.Sequential(
      nn.Conv2d(16,32,kernel_size=5,stride=1,padding=2), # 위 conv에서 ch 늘린 만큼 채널 넣어준다
      nn.ReLU()
    )# (14*14*32)
    self.layer4 = nn.MaxPool2d(kernel_size=2,stride=2) # (7*7*32)
    # 여기서 부터는 max_pooling이 힘드니 바로 FC 써먹자|
    self.layer5 = nn.Linear(7*7*32, num_classes) # 입력 차원, 출력 차원
  
  def forward(self, x):
    # Debug 2. 여기서도 많이 씀
    # pdb.set_trace()
    out=self.layer1(x)
    out=self.layer2(out)
    out=self.layer3(out)
    out=self.layer4(out)
    out=out.reshape(out.size(0),-1) # 2차원을 1차원으로 펼치는 과정
    out=self.layer5(out)
    # print(out.shape)
    return out

