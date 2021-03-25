<template>
  <div>
    ArythmeticsTaskWindow {{ id }}
    <b-container class="bv-example-row">
      <b-row>
        <b-col> {{ task.problem }} = </b-col>
<!--        <b-col><b-form-input type="number" v-model="answerTry" v-on:keypress="submit_keypress" placeholder="???"></b-form-input></b-col>-->
<!--        <b-col><b-button v-on:click="submit">Submit</b-button></b-col>-->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {ArythmeticsSolution, ArythmeticsTaskDef} from "./common";

export default {
  name: "ArythmeticsTaskWindow",
  data: function () {
    return {
      answerTry: String,
      task: this.solution.task,
    };
  },
  props: {
    id: String,
    solution: ArythmeticsSolution,
  },
  // computed: {
  //   abc() {
  //     return 456
  //   }
  // },
  mounted() {
   console.log("ArythmeticsTaskWindow mounted  " + this.task)
  },
  methods:{
    // submit(){
    //   let msg;
    //   let event;
    //   if(this.answerTry.toString() === this.task.answer){
    //     event = 'submit-correct';
    //     msg = "Correct"
    //   }else{
    //     event = 'submit-wrong'
    //     msg = "Wrong"
    //   }
    //   alert(msg)
    //   this.$emit(event)
    // },
    // submit_keypress(e){
    //   if(e.keyCode === 13){
    //     this.submit()
    //   }
    // }
  }
};
</script>