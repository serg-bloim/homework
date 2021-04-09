<template>
  <div>
    <b-container  class="w-100">
      <b-row>
        <b-col> <b-button @click="changeTask(-1)">Prev</b-button> </b-col>
        <b-col>
          <span class="my-font-h1">
          <router-link to="/list" class="list-link">List</router-link>
          {{ ind + 1 }}/{{ homework.tasks.length }}
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
          />
        </b-col>
      </b-row>
      <b-row>

      </b-row>
    </b-container>
    <div style="display: none">
      <h1>TaskView</h1>
          <arythmetics-task-window
              :id="123"
              :task="homework.tasks[ind]"
              v-on:submit-correct="on_correct"
          />
      <b-button @click="changeTask(-1)">Prev</b-button>
      <b-button @click="changeTask(1)">Next</b-button>
    </div>
  </div>
</template>

<script>
import ArythmeticsTaskWindow from "./arythmetics-task/ArythmeticsTaskWindow";
import Simple from "./Simple";
import {Homework} from "../util/common";

export default {
  name: "TaskView",
  components: {Simple, ArythmeticsTaskWindow},
  props: {
    initInd: Number,
    homework:Homework,
  },
  data() {
    return {
      ind: this.initInd ?? 0,
    }
  },
  computed: {
    current_task(){
      return this.homework.tasks[this.ind]
    }
  },

  methods: {
    on_correct() {
      setTimeout(()=>{this.changeTask(1)}, 1000)
    },
    changeTask(ind_change) {
      let len = this.homework.tasks.length;
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