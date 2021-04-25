<template>
  <div id="app" class="w-100 mt-4">
    <router-view :homework="activeHomework" v-on:update-active-homework="updateActive"/>
  </div>
</template>

<script>
import HomeworkRepo from "./util/HomeworkRepo";
import {Homework} from "homework-common/src/util/homework";
import {debug} from "homework-common/src/util/basic";

export default {
  name: 'App',
  data: () => ({
    activeHomework: Homework.empty(),
    taskState:{}
  }),
  methods: {
    updateActive(homework) {
      this.activeHomework = homework
      for (let task of homework.tasks) {
        HomeworkRepo.getTaskState(task.id).then(tsk => {
          if (tsk) {
            task.lastSubmissionSuccessful = tsk.solved
            if (tsk.state) {
              task.setState(tsk.state)
            }
          }
        })
      }
    }
  },
  mounted() {
    debug("mounted")
    HomeworkRepo.getActiveHomework().then(this.updateActive)
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
