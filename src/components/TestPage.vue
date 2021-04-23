<template>
  <div>
  Test Page
    <options-task/>
  </div>
</template>

<script>
import ArythmeticsTaskWindow from "./arythmetics-task/ArythmeticsTaskWindow";
import OptionsTask from "./options-task/OptionsTask";
export default {
  name: "TestPage",
  components: {OptionsTask, ArythmeticsTaskWindow}
}
</script>

<style scoped>

</style>