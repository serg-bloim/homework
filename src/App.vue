<template>
  <div id="app">
    <p>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
<!--      <router-link to="/list">Go to List</router-link>-->
    </p>
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
</style>
