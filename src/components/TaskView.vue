<template>
  <div>
    <arythmetics-task-window v-if="arythmetics" :task="task" v-on:submit-correct="on_correct"/>
<!--    <b-button>Next</b-button>-->
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
  data() {
    return {
      arythmetics: (this.task instanceof ArythmeticsTaskDef).toString(),
    };
  },
  methods:{
    on_correct(){
      alert('123')
    }
  }
}
</script>

<style scoped>

</style>