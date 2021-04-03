<template>
  <div id="app">
    <p>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link to="/list">Go to List</router-link>
    </p>

<!--    <task-list :tasks="tasks"/>-->
<!--    <arythmetics-task-window :task="singleTask" hidden/>-->
    <router-view/>
  </div>
</template>

<script>
import {ArythmeticsTaskDef, SumTaskFactory} from "./components/arythmetics-task/common";

export default {
  name: 'App',
  data: () => ({
    singleTask: new ArythmeticsTaskDef("2+2", "4"),
    tasks:[new ArythmeticsTaskDef("2+5", "7"), new ArythmeticsTaskDef("3+3", "6")]
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
