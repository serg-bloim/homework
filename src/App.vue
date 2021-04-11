<template>
  <div id="app" class="w-100 mt-4">
    <router-view :homework="activeHomework" v-on:generate-list="genList"/>
  </div>
</template>

<script>
import {generateTaskList} from "./util/generation";
import HomeworkRepo from "./util/HomeworkRepo";
import {Homework} from "./util/common";

export default {
  name: 'App',
  data: () => ({
    activeHomework: Homework.empty()
  }),
  methods: {
    genList() {
      this.activeHomework = HomeworkRepo.getActiveHomework()
    }
  },
  mounted() {
    HomeworkRepo.getActiveHomework().then(hw => this.activeHomework = hw)

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.row {
  margin-bottom: 25px;
}
</style>
