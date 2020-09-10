<template>
    <div class="mypage_card">
        <!-- 고객용 문의 창-->
        <div v-if="customerMode"> 
        <table>
            <tr>
                <th>스튜디오</th> <th colspan="2">문의 내용</th>
            </tr>
            <tr v-if="inquiryFlag">
                <td colspan="3" > 문의내역이 없습니다. </td>
            </tr>
            <tr v-else>
                <td>스튜디오이미지 / 스튜디오 이름</td> <td> 문의내용 샬라샬라 </td><td> 문의날짜</td>
            <!-- <tr v-for="(inquiry) in inquiryList" :key="inquiry">
                <td>{{reservation.studio.name}}</td> <td>{{reservation.totalPeople}}</td> 
                <td>{{reservation.totalPrice}}원</td> -->
            </tr>
        </table>
        </div>
        
        <!-- 스튜디오용 문의창 -->
        <div v-if="!customerMode"> 
            <table>
            <tr>
                <th>문의 고객</th> <th colspan="2">문의 내용</th>
            </tr>
            <tr tr v-if="inquiryFlag">
                <td colspan="3"> 문의내역이 없습니다. </td>
            </tr>
            <tr v-else>
                <td>고객이미지 / 고객닉네임</td> <td> 문의내용 샬라샬라 </td><td> 문의날짜</td>
            <!-- <tr v-for="(inquiry) in inquiryList" :key="inquiry">
                <td>{{reservation.studio.name}}</td> <td>{{reservation.totalPeople}}</td> 
                <td>{{reservation.totalPrice}}원</td>-->
            </tr>
        </table>
        </div>
    </div>
</template>

<style scoped src="@/assets/css/mypage/mypage_common.css"></style>
<script scoped src="@/assets/js/mypage/Inquiry.js"> </script>

