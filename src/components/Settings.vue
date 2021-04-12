<template>
<div>
  <div>
    <router-link to="/homeworks">Homeworks</router-link>
  </div>
  <b-button v-on:click="generateDate">Generate Data</b-button>
</div>
</template>

<script>
import {generateDBData} from "../util/setup";

export default {
  name: "Settings",
  methods:{
    generateDate(){
      generateDBData()
    }
  }
}
</script>

<style scoped>

</style>