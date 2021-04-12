<template>
  <div>
    <div class="tasklist">
      TaskList <router-link to="/homeworks">Lists</router-link>
      <div v-for="(task, tind) in homework.tasks"
           :key="task.id"
           v-on:click="selectTask(tind)"
           :class="task.is_correct()?'correct':'wrong'">
        {{ task.toString() }}
      </div>
    </div>
    <b-button v-on:click="$emit('generate-list')">Generate</b-button>
  </div>
</template>

<script>
// import {TaskDef} from "../util/common";

import {Homework} from "../util/common";

export default {
  name: "TaskList",
  props: {
    homework:Homework,
  },
  methods: {
    /**
     * @param {integer} tind
     */
    selectTask(tind) {
      this.$router.push({name: 'task', params: {initInd:tind, homework: this.homework}})
    }
  }
}
</script>

<style scoped>
div.tasklist .correct{
  background-color: darkseagreen;
}
div.tasklist .wrong{
  background-color: indianred;
}
</style>