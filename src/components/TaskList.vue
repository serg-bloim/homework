<template>
  <div class="tasklist">
    TaskList
    <div v-for="task in tasks"
         :key="task.id"
         v-on:click="selectTask(task)"
         :class="task.is_correct()?'correct':'wrong'"
    > {{ task.toString() }}
    </div>
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
    selectTask(task) {
      this.$router.push({name: 'task', params: {tasks: this.tasks, initTask: task}})
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