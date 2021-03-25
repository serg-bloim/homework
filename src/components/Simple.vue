<template>
<div>[Simple {{qwe}}/{{solution.id}}]</div>
</template>

<script>
import {ArythmeticsSolution} from "./arythmetics-task/common";

export default {
  name: "Simple",
  props:{
    qwe:String,
    solution:ArythmeticsSolution
  }
}
</script>

<style scoped>

</style>