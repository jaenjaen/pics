from urllib.request import urlopen
from urllib.parse import quote_plus
from bs4 import BeautifulSoup
from selenium import webdriver
import pandas as pd
import numpy as np
import time


url = "https://hourplace.co.kr/curation/26"

driver = webdriver.Chrome(
    executable_path="/Users/ryan/Documents/pics_view/python_crawing/webdriver/chromedriver"
)

# url 접속하기
driver.get(url)

# SCROLL_PAUSE_TIME = 2
# last_height = driver.execute_script("return document.body.scrollHeight")

# while True:
#     # [ 2 ] : 창 높이까지 스크롤
#     driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

#     # [ 3 ] : 스크롤 후 창이 로딩될때까지 2초를 기다리겠다는 명령어. 로딩이 다되면 바로 넘어감
#     time.sleep(SCROLL_PAUSE_TIME)
#     # 한 번에 맨 마지막까지 스크롤되면 아래 리스트가 뜨지 않아서, 마지막을 찍고 조금 창을 올리는 방법으로 리스트가 로딩될 수 있게 함
#     driver.execute_script("window.scrollTo(0, document.body.scrollHeight-50);")
#     time.sleep(SCROLL_PAUSE_TIME)

#     # 스크롤이 된 후의 창 높이를 새로운 높이로 저장
#     new_height = driver.execute_script("return document.body.scrollHeight")

#     # [ 6 ] : 새로운 높이가 이전 높이와 변하지 않았으면 스크롤 종료
#     if new_height == last_height:
#         break

#     last_height = new_height

list_url = []
list_image = []
tag_list = []
tags = []
list_studio_name = []
list_price = []
list_area = []
list_floor = []
list_default_people = []
list_parking = []
list_description = []
list_rule = []
num = 0
link_tag_num = 0
item_num = 0

# 동일한 태그가 여러개인 아이템 선택, 리스트형태로 값이 들어옴
list_item = driver.find_elements_by_class_name("item_place")

for i in list_item:
    # 하나씩 뽑아가며 그 아이템의 하위 xpath 로 이동후 거기서 href 속성의 값을 받아온다.
    index_href = list_item[num].find_elements_by_xpath(
        ".//a")[0].get_attribute("href")
    # print(list_href)
    # 그걸 새로운 리스트에 추가
    list_url.append(index_href)
    num += 1
num = 0
for i in list_url:
    #  뽑아온 주소로 순차대로 이동
    driver.get(list_url[num])
    time.sleep(2)

    # 이미지 주소 받아오기
    image_address = driver.find_element_by_class_name(
        "active").get_attribute("style")
    # "" 안에 주소가 있기 떄문에 뽑아낸다.
    val = image_address.split('"', 1)[1].split('"')[0]
    list_image.append(val)  # 리스트에 넣는다.

    # 태그 긁어오기
    link_tag = driver.find_elements_by_class_name("link_tag")
    for j in link_tag:
        tag = link_tag[link_tag_num].text
        tags.append(tag)
        link_tag_num += 1
    tag_list.append(tags)
    tags = []
    link_tag_num = 0

    # 스튜디오 이름 받아서 리스트에 넣기
    list_studio_name.append(
        driver.find_element_by_class_name("tit_detail").text)
    # 스튜디오 가격 받기
    list_price.append(driver.find_element_by_class_name("txt_price").text)

    # 정보 받아오기
    list_first = driver.find_element_by_class_name("info_area")
    list_items = list_first.find_elements_by_tag_name("dd")
    list_area.append(list_items[0].text)
    list_floor.append(list_items[1].text)
    list_default_people.append(list_items[2].text)
    list_parking.append(list_items[3].text)

    # 내용 받아오기
    list_description.append(
        driver.find_element_by_class_name("desc_detail").text)

    # rule 받아오기
    list_rule.append(driver.find_element_by_class_name("desc_detail").text)

    num += 1
    if(num == 2):
        break

driver.close()

data_frame = pd.DataFrame({
    'studio_name': list_studio_name,
    'studio_picture': list_image,
    'tag': tag_list,
    'price': list_price,
    'area': list_area,
    'floor': list_floor,
    'default_person': list_default_people,
    'parking': list_parking,
    'description': list_description,
    'rule': list_rule
})
data_frame.to_excel('studio_info.xlsx')
