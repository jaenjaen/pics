<template>
  <div>
    <div class="main_category">
      <div class="main_container">
        <div class="main_icon">
          <a href>
            <img src="../../assets/img/main_icon/cafe.svg" alt @click.prevent="moveToSearch(2)"/>
          </a>
          <p>카페</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../../assets/img/main_icon/house.svg" alt @click.prevent="moveToSearch(3)"/>
          </a>
          <p>집</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../../assets/img/main_icon/office.svg" alt @click.prevent="moveToSearch(4)"/>
          </a>
          <p>사무실</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../../assets/img/main_icon/pub.svg" alt @click.prevent="moveToSearch(7)"/>
          </a>
          <p>PUB</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../../assets/img/main_icon/resturant.svg" alt @click.prevent="moveToSearch(5)"/>
          </a>
          <p>식당</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../../assets/img/main_icon/rooftop.svg" alt @click.prevent="moveToSearch(6)"/>
          </a>
          <p>루프탑</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../../assets/img/main_icon/school.svg" alt @click.prevent="moveToSearch(8)"/>
          </a>
          <p>학교</p>
        </div>
        <div class="main_icon">
          <a href>
            <img src="../../assets/img/main_icon/studio.svg" alt @click.prevent="moveToSearch(1)"/>
          </a>
          <p>스튜디오</p>
        </div>
      </div>
    </div>
    <MainSecond />
    <MainThird />
  </div>
</template>

<script scoped src="@/assets/js/main/main.js"></script>

<style scoped src="../../assets/css/remove_css.css">
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css">
</style>
<style scoped src="@/assets/css/main/main.css">
</style>
