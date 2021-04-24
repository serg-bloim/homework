<template>
  <div>
    <b-container  class="w-100">
      <b-row>
        <b-col> <b-button @click="changeTask(-1)">Prev</b-button> </b-col>
        <b-col>
          <span class="my-font-h1">
          <router-link to="/list" class="list-link">List</router-link>
          {{ submitted_tasks }}/{{ homework.tasks.length }}
            </span>
        </b-col>
        <b-col> <b-button @click="changeTask(1)">Next</b-button> </b-col>
      </b-row>
      <b-row>
        <b-col colspan="3">
          <component :is="componentName(current_task)"
                     :id="current_task.id"
                     :task="current_task"
                     v-on:submit="submit"
                     v-if="current_task"
          />
<!--          <arythmetics-task-window-->
<!--              :id="current_task.id"-->
<!--              :task="current_task"-->
<!--              v-on:submit="submit"-->
<!--              v-if="current_task"-->
<!--          />-->
        </b-col>
      </b-row>
      <b-row>
          <b-col>
            <b-button v-on:click="submit">Submit</b-button>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ArythmeticsTaskWindow from "./arythmetics-task/ArythmeticsTaskWindow";
import HomeworkRepo from "../util/HomeworkRepo";
import OptionsTask from "./options-task/OptionsTask";
import {Homework} from "homework-common/src/util/homework";
import {next_array_key} from "homework-common/src/util/arrays";

export default {
  name: "TaskView",
  components: {ArythmeticsTaskWindow},
  props: {
    initInd: Number,
    homework:Homework,
  },
  data() {
    return {
      ind: this.initInd ?? 0,
      attemptStartedTS: 0,
      alreadyStarted:false,
    }
  },
  computed: {
    current_task(){
      return this.homework.tasks[this.ind]
    },
    submitted_tasks(){
      return this.homework.tasks.count(t=>t.hasAnswer())
    },
  },
  updated() {
    console.log("updated")
  },
  mounted() {
    console.log("TaskView mounted " + this.alreadyStarted)
    this.startAttempt()
  },
  watch:{
    ind(updated, old){
      console.log(`ind ${old} -> ${updated}`)
      window.scrollTo(0,0)
      this.startAttempt()
    },
    homework(updated, old){
      console.log(`homework ${old.name} -> ${updated.name}`)
      this.startAttempt()
    },
  },
  methods: {
    submit() {
      let isCorrect = this.current_task.is_correct();
      let ans = this.current_task.createSubmission();
      ans.attemptTime = Date.now() - this.attemptStartedTS
      this.attemptStartedTS = Date.now()
      HomeworkRepo.reportTaskAnswer(isCorrect, this.current_task, ans);
      if (isCorrect) {
        for (let ind of next_array_key(this.ind + 1, this.homework.tasks.length)) {
          if (!this.homework.tasks[ind].hasAnswer()) {
            setTimeout(() => {
              this.ind = ind
            }, 1000)
            break
          }
        }
      }
    },
    componentName(current_task){
      return {
        ArythmeticsTaskDef: ArythmeticsTaskWindow,
        OptionsTaskDef: OptionsTask

      }[current_task.__class]
    },
    changeTask(ind_change) {
      let len = this.homework.tasks.length;
      this.ind = (this.ind + ind_change + len) % len
    },
    startAttempt(){
      this.attemptStartedTS = Date.now()
      console.log("attempt started")
    },
  },
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