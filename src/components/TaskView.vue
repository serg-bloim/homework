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
              v-on:submit-wrong="on_wrong"
              v-if="current_task"
          />
        </b-col>
      </b-row>
      <b-row>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import ArythmeticsTaskWindow from "./arythmetics-task/ArythmeticsTaskWindow";
import Simple from "./Simple";
import {Homework} from "../util/common";
import HomeworkRepo from "../util/HomeworkRepo";

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
    on_correct(ans) {
      HomeworkRepo.reportTaskAnswer(true, this.current_task.id, Date.now(), this.current_task.getState());
      setTimeout(()=>{this.changeTask(1)}, 1000)
    },
    on_wrong(ans) {
      HomeworkRepo.reportTaskAnswer(false, this.current_task.id, Date.now(), this.current_task.getState());
    },
    changeTask(ind_change) {
      let len = this.homework.tasks.length;
      this.ind = (this.ind + ind_change + len) % len
    },
  },
  mounted() {
    console.log(this.homework)
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