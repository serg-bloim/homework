<template>
  <div>
    <table>
      <tr>
        <td> <b-button @click="changeTask(-1)">Prev</b-button> </td>
        <td>
          <router-link to="/list">List</router-link>
          {{ ind + 1 }}/{{ tasks.length }}
        </td>
        <td> <b-button @click="changeTask(1)">Next</b-button> </td>
      </tr>
      <tr>
        <td colspan="3">
          <arythmetics-task-window
              :id="current_task.id"
              :task="current_task"
              v-on:submit-correct="on_correct"
              v-on:submit-wrong="on_wrong"
          />
        </td>
      </tr>
      <tr></tr>
    </table>
    <div style="display: none">
      <h1>TaskView</h1>
      <div v-for="tsk in tasks" :key="tsk.id">
        <div v-if="task.id === tsk.id">
          <arythmetics-task-window
              :id="tsk.id"
              :task="tsk"
              v-on:submit-correct="on_correct"
              v-on:submit-wrong="on_wrong"
          />
        </div>
      </div>
      <b-button @click="changeTask(-1)">Prev</b-button>
      <b-button @click="changeTask(1)">Next</b-button>
    </div>
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
    initInd: Number,
  },
  mounted() {
    console.log("mounted:")
    console.log(this.task?.preview?.())
  },
  data() {
    return {
      task: this.initTask,
      ind: this.initInd ?? 0,
    }
  },
  computed: {
    tsk_preview() {
      return this.task?.preview?.()
    },
    arythmetics() {
      return this.task instanceof ArythmeticsTaskDef;
    },
    current_task(){
      return this.tasks[this.ind]
    }
  },

  methods: {
    on_correct() {
      alert('Correct')
    },
    on_wrong() {
      alert('Wrong')
    },
    changeTask(ind_change) {
      let len = this.tasks.length;
      this.ind = (this.ind + ind_change + len) % len
    },
  }
}

</script>

<style scoped>

</style>