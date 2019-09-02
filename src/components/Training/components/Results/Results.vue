<template>
  <div class="results">
    <div class="row">
      <h1 class="title">
        Results
      </h1>
    </div>

    <div class="row">
      <table
        ref="rawTableResults"
        border="2"
        bgcolor="lightblue"
      >
        <thead>
          <tr>
            <th
              v-for="(label, index) in tableHeaders"
              :key="index"
              nowrap
            >
              {{ label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="i in parseInt(numberOfVideos)"
            :key="i"
          >
            <td>
              Q{{ i }}
            </td>
            <td nowrap>
              {{ userAnswers[i-1] }}
            </td>
            <td nowrap>
              {{ correctAnswers[i-1] }}
            </td>
            <td>
              {{ distances[i-1] }}
            </td>
            <td>
              {{ deltaXs[i-1] }}
            </td>
            <td>
              {{ deltaYs[i-1] }}
            </td>
            <td>
              {{ durations[i-1] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="row btn-row">
      <mybutton
        class="mybtn"
        download
        font-size="200%"
        @click="savefile"
      >
        儲存
      </mybutton>
      <mybutton
        class="mybtn"
        download
        font-size="200%"
        @click="leave"
      >
        離開
      </mybutton>
    </div>
  </div>
</template>

<script src="./result.js"></script>

<style src="./result.css" scoped></style>