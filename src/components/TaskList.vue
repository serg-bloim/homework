<template>
  <div>
    <div class="tasklist">
      TaskList
      <div v-for="(task, tind) in tasks"
           :key="task.id"
           v-on:click="selectTask(task, tind)"
           :class="task.is_correct()?'correct':'wrong'">
        {{ task.toString() }}
      </div>
    </div>
    <b-button v-on:click="$emit('generate-list')">Generate</b-button>
  </div>
</template>

<script>
// import {TaskDef} from "../util/common";

export default {
  name: "TaskList",
  props: {
    /**
     * @param {TaskDef[]} tasks
     */
    tasks: Array
  },
  methods: {
    /**
     * @param {TaskDef} task
     */
    selectTask(task, tind) {
      this.$router.push({name: 'task', params: {tasks: this.tasks, initInd:tind}})
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