<template>
  <div id="app">
    <arythmetics-task-window :task="singleTask"/>
  </div>
</template>

<script>
import ArythmeticsTaskWindow from './components/arythmetics-task/ArythmeticsTaskWindow.vue'
import {ArythmeticsTaskDef} from "./components/arythmetics-task/common";


export default {
  name: 'App',
  components: {
    ArythmeticsTaskWindow
  },
  data: () => ({
    singleTask: new ArythmeticsTaskDef("2+2", "4")
  })
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
