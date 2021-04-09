<template>
  <div>
    <b-container  class="w-100">
      <b-row>
        <b-col> <b-button @click="changeTask(-1)">Prev</b-button> </b-col>
        <b-col>
          <span class="my-font-h1">
          <router-link to="/list" class="list-link">List</router-link>
          {{ ind + 1 }}/{{ tasks.length }}
            </span>
        </b-col>
        <b-col> <b-button @click="changeTask(1)">Next</b-button> </b-col>
      </b-row>
      <b-row>
        <b-col colspan="3">
          <arythmetics-task-window
              :id="current_task.id"
              :task="current_task"
              v-on:submit-correct="on_correct"
              v-on:submit-wrong="on_wrong"
          />
        </b-col>
      </b-row>
      <b-row>

      </b-row>
    </b-container>
    <div style="display: none">
      <h1>TaskView</h1>
<!--      <div v-for="tsk in tasks" :key="tsk.id">-->
<!--        <div v-if="tasks[ind].id === tsk.id">-->
          <arythmetics-task-window
              :id="123"
              :task="tasks[ind]"
              v-on:submit-correct="on_correct"
              v-on:submit-wrong="on_wrong"
          />
<!--        </div>-->
<!--      </div>-->
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
      setTimeout(()=>{this.changeTask(1)}, 1000)
      // this.changeTask(1)
      // alert('Correct')
    },
    on_wrong() {
      // alert('Wrong')
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