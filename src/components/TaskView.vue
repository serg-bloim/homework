<template>
  <div>
    <table  class="m-5">
      <tr>
        <td> <b-button @click="changeTask(-1)">Prev</b-button> </td>
        <td>
          <span class="my-font-h1">
          <router-link to="/list" class="list-link">List</router-link>
          {{ ind + 1 }}/{{ tasks.length }}
            </span>
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
        <div v-if="tasks[ind].id === tsk.id">
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
    tasks: Array,
    initInd: Number,
  },
  data() {
    return {
      ind: this.initInd ?? 0,
    }
  },
  computed: {
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
.list-link{
  font-family: Helvetica;

}
.my-font-h1 {
  font-size: x-large;
  font-family: Helvetica;
}
</style>