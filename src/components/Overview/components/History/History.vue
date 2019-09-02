<template>
  <div class="history">
    <table>
      <tr
        v-for="(tag, index) in tableHeaders"
        :key="index"
      >
        <th>{{ tag }}</th>
        <td v-if="typeof(userInfo.history[ tableDataLabels[index] ]) !== 'object'">
          {{ userInfo.history[ tableDataLabels[index] ] }}
        </td>
        <td
          v-else
          class="max-err"
        >
          <div
            v-for="option in userInfo.history[ tableDataLabels[index] ]"
            :key="option"
          >
            {{ option }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script src="./history.js"></script>

<style src="./history.css" scoped></style>