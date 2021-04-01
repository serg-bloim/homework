<template>
  <div>
    ArythmeticsTaskWindow
    <b-container class="bv-example-row">
      <b-row>
        <b-col> {{ task.problem }} = </b-col>
        <b-col><b-form-input type="number" v-model="task.answer" v-on:keypress="submit_keypress" placeholder="???"></b-form-input></b-col>
        <b-col><b-button v-on:click="submit">Submit</b-button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {ArythmeticsSolution, ArythmeticsTaskDef} from "./common";

export default {
  name: "ArythmeticsTaskWindow",
  data: function () {
    console.log("ArythmeticsTaskWindow->data()")
    return {
      answerTry: undefined
    };
  },
  props: {
    id: String,
    task: ArythmeticsTaskDef,
  },
  computed: {
    abc() {
      return 456
    },
  },
  mounted() {
   console.log("ArythmeticsTaskWindow mounted  " + this.task)
  },
  methods:{
    submit(){
      let msg;
      let event;
      if(this.task.answer.toString() === this.task.correctAnswer){
        event = 'submit-correct';
        msg = "Correct"
      }else{
        event = 'submit-wrong'
        msg = "Wrong"
      }
      alert(msg)
      this.$emit(event)
    },
    submit_keypress(e){
      if(e.keyCode === 13){
        this.submit()
      }
    }
  }
};
</script>