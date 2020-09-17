<template>
  <div class="container" id="searchStudio">
    <!-- 검색 부분 -->
    <div id="search">
      <span id="searchBorder">
        <input
          id="searchContent"
          name="searchContent"
          type="text"
          v-model="filters.searchContent"
          placeholder="나에게 딱 맞는 촬영공간 찾기    ||    '#' 을 앞에 붙이면 해시태그 검색 "
          v-on:keyup.enter="setFilter"
        />
      </span>
    </div>
    <!-- 이미지 검색 부분 -->
    <i class="material-icons" id="icon_filter" v-if="!isImage" @click="isImage=true" >camera_alt</i>
    <span v-if="isImage" @click="isImage=false" >되돌리기</span>
    <ImageSearch v-if="isImage" />
    <!-- 필터 부분 -->
    <div class="row" id="filter" v-if="!isImage">
      <!-- 필터 Collapse -->
      <div id="filterCol">
        <div>
          <div v-b-toggle.my-collapse class="collapsible-header" id="colHeader">
            <p>내가 원하는 조건으로 찾기</p>
          </div>
          <b-collapse id="my-collapse" v-model="visible">
            <div id="filterSpace">
              <div id="cateNdate">
                <!-- 카테고리 -->
                <div
                  class="input-field"
                  id="categoryFilter"
                  name="categoryFilter"
                >
                  <p id="cateWord">카테고리로 찾기</p>
                  <!-- <i class="material-icons" id="icon_filter">dashboard</i> -->
                  <select name="cataSelect" id="cataSelect" @change="setCategory" ref="cataSelect">
                    <option value="none">카테고리를 선택해주세요</option>
                    <option value="-1">전체</option>
                    <option value="1">스튜디오</option>
                    <option value="2">카페</option>
                    <option value="3">집</option>
                    <option value="4">사무실</option>
                    <option value="5">음식점</option>
                    <option value="6">루프탑</option>
                    <option value="7">펍</option>
                    <option value="8">학교</option>
                    <option value="9">기타</option>
                  </select>
                </div>
                <!-- 날짜 -->
                <div id="dateFilter" name="dateFilter">
                  <p>예약 날짜로 찾기</p>
                  <i class="material-icons" id="icon_filter"
                    >insert_invitation</i
                  >
                  <input type="date" v-model="filters.selectedDate" />
                  <span id="dateInit" @click="initFilter(1)">날짜 초기화</span>
                </div>
              </div>
              <hr />

              <!-- 주소 -->
              <div id="addrFilter" name="addrFilter">
                <p>주소로 찾기</p>
                <i class="material-icons" id="icon_filter">gps_fixed</i>
                <input
                  type="text"
                  value=""
                  v-model="filters.addr1"
                  placeholder="도시명을 입력해주세요"
                />
                <span>시</span>
                <input
                  type="text"
                  value=""
                  v-model="filters.addr2"
                  placeholder="구/면/읍 입력해주세요"
                />
                <span>구/면/읍</span>
              </div>
              <hr />

              <!-- 장소 규모 -->
              <div id="sizeFilter" name="sizeFilter">
                <p>공간 크기로 찾기</p>
                <i class="material-icons" id="icon_filter">location_city</i>
                <input
                  type="text"
                  value=""
                  v-model="filters.minSize"
                  placeholder="최소면적을 입력해주세요"
                />
                <span>m<sub>2</sub></span
                ><span>~</span>
                <input
                  type="text"
                  value=""
                  v-model="filters.maxSize"
                  placeholder="최대면적을 입력해주세요"
                />
                <span>m<sub>2</sub></span>
              </div>
              <hr />

              <!-- 인원수 -->
              <div id="capaFilter" name="capaFilter">
                <p>인원 규모로 찾기</p>
                <i class="material-icons" id="icon_filter">accessibility</i>
                <i class="material-icons" id="icon_capa1" @click="modifyCapa(0)">exposure_neg_1</i>
                <span>{{ filters.capacity }}명</span>
                <i class="material-icons" id="icon_capa2" @click="modifyCapa(1)">exposure_plus_1</i>
              </div>
              <hr />

              <!-- 가격 -->
              <div id="priceFilter" name="priceFilter">
                <p>시간당 가격으로 찾기</p>
                <i class="material-icons" id="icon_filter">attach_money</i>
                <input
                  type="text"
                  value=""
                  v-model="filters.minUnitPrice"
                  placeholder="최소금액을 입력해주세요"
                />
                <span>원</span><span>~</span>
                <input
                  type="text"
                  value=""
                  v-model="filters.maxUnitPrice"
                  placeholder="최대금액을 입력해주세요"
                />
                <span>원</span>
              </div>
              <div id="filterBtn">
                <!-- 초기화 버튼 -->
                <button
                  class="waves-effect waves-light btn-small"
                  id="initBtn"
                  @click="initFilter(2)"
                >
                  초기화
                </button>
                <!-- 적용 버튼 -->
                <button
                  class="waves-effect waves-light btn-small"
                  id="applyBtn"
                  @click="setFilter"
                >
                  적용
                </button>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
    <!-- 정렬하기 부분 -->
    <div id="order" v-if ="!isImage" > 
      <!-- 정렬하기 위한 select 태그 -->
      <select name="orderCon" id="orderCon" @change="setFilter" v-model="filters.orderCon">
        <option value disabled>정렬하기</option>
        <option value="1">인기순</option>
        <option value="2">높은 가격순</option>
        <option value="3">낮은 가격순</option>
        <option value="4">평점순</option>
      </select>
    </div>
    <StudioList :filters="filters" ref="studioList"/>
  </div>
</template>

<script type="text/javascript" scoped src="@/assets/js/search/StudioSearch.js"></script>

<style scoped type="text/css" src="materialize-css/dist/css/materialize.min.css"></style>
<style scoped src="material-design-icons/iconfont/material-icons.css"></style>

<style scoped src="@/assets/css/search/StudioSearch.css">
