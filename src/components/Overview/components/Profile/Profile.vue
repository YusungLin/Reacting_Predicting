<template>
  <div class="profile">
    <table border="1">
      <tr class="user-name">
        <th>使用者名稱：</th>
        <td>{{ $cookies.get('session') }}</td>
      </tr>
      <tr class="level">
        <th>等級：</th>
        <td>{{ userInfo.level }}</td>
      </tr>
      <tr class="battle">
        <th>比賽紀錄</th>
        <td
          v-for="(data, index) in roundWin"
          :key="'得分：'+index"
        >
          得分：{{ data }}
        </td>
        <td
          v-for="(data, index) in roundLoss"
          :key="'失分：'+ index"
        >
          失分：{{ data }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script src="./profile.js"></script>

<style src="./profile.css" scoped></style>