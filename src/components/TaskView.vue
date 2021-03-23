<template>
  <div>
    <div>{{ tsk_preview }}</div>
    <arythmetics-task-window v-if="arythmetics"/>
  </div>
</template>

<script>
import {TaskDef} from "../util/common";
import ArythmeticsTaskWindow from "./arythmetics-task/ArythmeticsTaskWindow";
import {ArythmeticsTaskDef} from "./arythmetics-task/common";

export default {
  name: "TaskView",
  components: {ArythmeticsTaskWindow},
  props: {
    task: TaskDef,
    id: String,
  },
  mounted() {
    console.log("mounted:")
    console.log(this.task?.preview())
  },
  computed: {
    tsk_preview() {
      return this.task?.preview()
    },

  },
  data: () => ({
    arythmetics: this?.task instanceof ArythmeticsTaskDef
  })
}
</script>

<style scoped>

</style>