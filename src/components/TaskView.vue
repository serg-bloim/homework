<template>
  <div>
    <h1>TaskView</h1>
    <div>{{solution.task.preview()}}</div>
    <div>{{solution.id}}</div>
<!--    v-if="arythmetics"-->
    <simple :qwe="solution.id" :solution="solution" />
    <arythmetics-task-window
        :id="solution_id"
        :solution="solution"/>
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
    console.log(this.task?.preview())
  },
  computed: {
    tsk_preview() {
      return this.task?.preview()
    },
    task(){
      return this.solution.task
    },
    arythmetics() {
      return this.solution.task instanceof ArythmeticsTaskDef;
    },
  },
  data() {
    let sols = this.tasks.map(t=>t.createSolution())
    let sol = sols.find(s=>s.task.id === this.initTask.id)
    return {
      solutions: sols,
      solution: sol,
      solution_id: sol.id
    };
  },
  methods:{
    on_correct(){
      alert('123')
    },
    changeTask(ind_change){
      let ind = this.solutions.findIndex(s=>s.task.id === this.solution.task.id)
      let new_ind = (ind+ind_change)%this.solutions.length
      let sol = this.solutions[new_ind];
      this.solution = sol
      console.log(this.solution)
      console.log(this.solution.task.preview())
      ind++
    },
  }
}

</script>

<style scoped>

</style>