<template>
  <div>
    <b-container class="bv-example-row">
      <b-row align-v="center">
        <b-col align="right"><span class="arythmetics-task arythmetics-problem">{{ task.problem }} =</span> </b-col>
        <b-col align="left"><span class="arythmetics-task arythmetics-answer">
          <b-form-input type="number" v-model="task.answer" v-on:keypress="submit_keypress" placeholder="???" class="arythmetics-task"/>
        </span></b-col>
<!--        <b-col></b-col>-->
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
import {ArythmeticsTaskDef} from "./common";

export default {
  name: "ArythmeticsTaskWindow",
  data: () => ({
    answerTry: undefined
  }),
  props: {
    id: String,
    task: ArythmeticsTaskDef,
  },
  methods:{
    submit(){
      let event;
      if(this.task.answer.toString() === this.task.correctAnswer){
        event = 'submit-correct';
      }else{
        event = 'submit-wrong'
      }
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

<style type="text/css">
.arythmetics-task {
  font-family: Helvetica;
  font-size: x-large;
}
</style>