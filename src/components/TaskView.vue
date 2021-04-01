<template>
  <div>
    <h1>TaskView</h1>
    <div v-for="tsk in tasks" :key="tsk.id">
      <div v-if="task.id === tsk.id">
        {{ tsk.id }}
        <arythmetics-task-window
            :id="tsk.id"
            :task="tsk"
            v-on:submit-correct="on_correct"
        />
      </div>
    </div>
    <b-button @click="changeTask(-1)">Prev</b-button>
    <b-button @click="changeTask(1)">Next</b-button>
  </div>
</template>

<script>
import {TaskDef} from "../util/common";
import ArythmeticsTaskWindow from "./arythmetics-task/ArythmeticsTaskWindow";
import {ArythmeticsTaskDef} from "./arythmetics-task/common";
import Simple from "./Simple";

export default {
  name: "TaskView",
  components: {Simple, ArythmeticsTaskWindow},
  props: {
    id: String,
    initTask: TaskDef,
    tasks: Array,
  },
  mounted() {
    console.log("mounted:")
    console.log(this.task?.preview?.())
  },
  data(){
    return{
      task:this.initTask
    }
  },
  computed: {
    tsk_preview() {
      return this.task?.preview?.()
    },
    arythmetics() {
      return this.task instanceof ArythmeticsTaskDef;
    },
  },

  methods: {
    on_correct() {
      alert('123')
    },
    changeTask(ind_change) {
      let ind = this.tasks.findIndex(tsk => tsk.id === this.task.id)
      let len = this.tasks.length;
      let new_ind = (ind + ind_change + len) % len
      let tsk = this.tasks[new_ind];
      this.task = tsk
      console.log(this.task)
      console.log(this.task.preview())
      ind++
    },
  }
}

</script>

<style scoped>

</style>