<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col> {{ task.problem }} = </b-col>
        <b-col><b-form-input type="number" v-model="answerTry" v-on:keypress="submit_keypress" placeholder="???"></b-form-input></b-col>
        <b-col><b-button v-on:click="submit">Submit</b-button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {ArythmeticsTaskDef} from "./common";

export default {
  name: "ArythmeticsTaskWindow",
  data: function () {
    return {
      answerTry: undefined,
      qwe: 'hello3'
    };
  },
  props: {
    problem: String,
    correctAnswer: String,
    task: ArythmeticsTaskDef
  },
  computed: {
    abc() {
      return 456
    }
  },
  methods:{
    submit(){
      let msg;
      if(this.answerTry.toString() === this.task.answer){
        msg = "Correct"
      }else{
        msg = "Wrong"
      }
      alert(msg)
    },
    submit_keypress(e){
      if(e.keyCode === 13){
        this.submit()
      }
    }
  }
};
</script>