<template>
  <div id="app" class="w-100 mt-4">
    <router-view :tasks="tasks" v-on:generate-list="genList"/>
  </div>
</template>

<script>
import {generateTaskList} from "./util/generation";

export default {
  name: 'App',
  data: () => ({
    tasks: generateTaskList()
  }),
  methods: {
    genList() {
      this.tasks = generateTaskList()
    }
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
.row{
  margin-bottom: 25px;
}
</style>
