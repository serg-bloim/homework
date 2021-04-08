<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col> {{ task.problem }} = </b-col>
        <b-col><b-form-input type="number" v-model="task.answer" v-on:keypress="submit_keypress" placeholder="???"></b-form-input></b-col>
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