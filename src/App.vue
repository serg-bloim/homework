<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <b-button>Test button</b-button>
    <arythmetics-task :problem="'2+2'" :answer="4"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ArythmeticsTask from './components/ArythmeticsTask.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ArythmeticsTask
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
  margin-top: 60px;
}
</style>
