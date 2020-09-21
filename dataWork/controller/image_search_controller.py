#!/usr/bin/env python
# coding: utf-8

# In[1]:


#!/usr/bin/env python
# coding: utf-8

# In[18]:


import torch
from PIL import Image
import torchvision
from torchvision import transforms
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from os import listdir, remove
from os.path import isfile, join
import sys
sys.path.append('..')
from dao.image_dao import get_stuId_by_img


# In[9]:


# filepath = 'C:/kjy/pics/frontend/src/assets/img/studio' # 서버에 이미지 저장 디렉토리 경로
# savepath= 'C:/kjy/pics/dataWork/resources/sim_table/output.pt' # feature 저장할 경로
# savedpath = 'C:/kjy/pics/dataWork/resources/sim_table/output.pt' # 저장된 feature 가져오기 위한 경로



# In[11]:


def get_stuIds_by_img(file, root_path):
    filepath = join(root_path, 'frontend/src/assets/img/studio')
    simpath = join(root_path, 'dataWork/resources/sim_table/output.pt')
    saved_img_path = join(root_path, 'dataWork/resources/images')
    
    file.filename = 'target.jpg'
    file.save(join(saved_img_path,file.filename))
    
    result_list = get_sim_image_names(saved_img_path, file.filename, simpath)
    stu_ids = get_stuId_by_img(result_list)
    
    stuId_list = ""
    for stu_id in stu_ids:
        stuId_list += str(stu_id)+","
    
    remove(join(saved_img_path,file.filename))
    return stuId_list[:-1]


# In[2]:


# CNN 모델 불러오기 __ resnet152
def get_model() :
    model = torch.hub.load('pytorch/vision:v0.6.0', 'resnet152', pretrained=True)
    return model


# In[3]:


# feature 추출하기
def extract_feature(saved_img_path,image_name) :
    input_image = Image.open(join(saved_img_path,image_name))
    model = get_model()
    preprocess = transforms.Compose([
      transforms.Resize(256),
      transforms.CenterCrop(224),
      transforms.ToTensor(),
      transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    input_tensor = preprocess(input_image)
    input_batch = input_tensor.unsqueeze(0) # create a mini-batch as expected by the mode

    if torch.cuda.is_available():
      input_batch = input_batch.to('cuda')
      model.to('cuda')

    with torch.no_grad():
      output = model(input_batch)

    return torch.nn.functional.softmax(output[0], dim=0)


# In[4]:


def get_image_name_list(filepath) :
    files = [f for f in listdir(filepath) if isfile(join(filepath, f))]
    return files


# In[5]:


# 서버 이미지 저장하기
def set_sim_image(filepath, savepath) :
    try :
        files = get_image_name_list(filepath)
        feature_list = []
        for file_name in files[:-5]:
            vector = extract_feature(filepath, file_name)
            feature = {
              'name' : file_name,
              'vector' : vector
              }
            feature_list.append(feature)
            torch.save(feature_list, savepath)
        return "save successfully"
    except :
        return feature_list    


# In[6]:


def get_sim_image(savedpath) :
    return torch.load(savedpath)


# In[7]:


def get_sim_image_names(saved_img_path, file_name, simpath):
    target_img = extract_feature(saved_img_path,file_name)
    feature_list = get_sim_image(simpath)
    sim_list = []
    cos = torch.nn.CosineSimilarity(dim=-1)
    for feature in feature_list:
        sim_degree = cos(target_img,feature['vector'])
        sim = {
          'name' : feature['name'],
          'sim_degree' : float(sim_degree)
        }
        sim_list.append(sim)
    df = pd.DataFrame(sim_list)
    image_names = df.sort_values(by='sim_degree' ,ascending=False)[:50]['name']
    return image_names


# In[8]:


def show_pics(result_list, target_file) :
    print(target_file)
    img =Image.open(join(filepath,target_file))
    # img.show()
    pix=np.array(img)
    plt.imshow(img)
    plt.show()
    print('-'*30)
    for img_name in result_list:
        print(img_name)
        img =Image.open(join(filepath,img_name))
        pix=np.array(img)
        plt.imshow(img)
        plt.show()


# In[ ]:


