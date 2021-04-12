<template>
  <div id="app" class="w-100 mt-4">
    <router-view :homework="activeHomework" v-on:update-active-homework="updateActive"/>
  </div>
</template>

<script>
import HomeworkRepo from "./util/HomeworkRepo";
import {Homework} from "./util/common";

export default {
  name: 'App',
  data: () => ({
    activeHomework: Homework.empty()
  }),
  methods: {
    updateActive(homework) {
      this.activeHomework = homework
    }
  },
  mounted() {
    HomeworkRepo.getActiveHomework().then(hw => {
      this.activeHomework = hw
      for (let task of hw.tasks) {
        HomeworkRepo.getTaskState(task.id).then(s => {
          if (s) {
            task.setState(s)
          }
        })
      }
    })

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
