<template>
  <div>
    <div class="tasklist">
      TaskList
      <router-link to="/homeworks">Lists</router-link>
      <div v-for="(task, tind) in homework.tasks"
           :key="task.id"
           v-on:click="selectTask(tind)"
           :class="task.lastSubmissionSuccessful===true ? 'correct' : task.lastSubmissionSuccessful === false ? 'wrong' : ''">
        {{ task.toString() }}
      </div>
    </div>
  </div>
</template>

<script>
import {Homework} from "homework-common/src/util/homework";
import HomeworkRepo from "../util/HomeworkRepo";

export default {
  name: "TaskList",
  props: {
    homework: Homework,
  },
  data() {
    return {
      status: this.homework.tasks.reduce((acc, task) => ({...acc, [task.id]: 'none'}), {})
    }
  },
  methods: {
    /**
     * @param {integer} tind
     */
    selectTask(tind) {
      this.$router.push({name: 'task', params: {initInd: tind, homework: this.homework}})
    },
    // updateTaskStatuses(){
    //   this.homework.tasks.forEach(tsk => HomeworkRepo.getTaskState(tsk.id).then(state => {
    //     this.$set(this.status, state.id, state.solved)
    //   }))
    // }
  },
  // mounted() {
  //   this.updateTaskStatuses()
  // },
  // updated() {
  //   this.updateTaskStatuses()
  // }
}
</script>

<style scoped>
div.tasklist .correct {
  background-color: darkseagreen;
}

div.tasklist .wrong {
  background-color: indianred;
}
</style>