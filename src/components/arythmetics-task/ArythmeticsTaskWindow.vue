<template>
  <div>
    ArythmeticsTaskWindow
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
    task: ArythmeticsTaskDef,
  },
  computed: {
    abc() {
      return 456
    }
  },
  mounted() {
   console.log(this.task)
  },
  methods:{
    submit(){
      let msg;
      let event;
      if(this.answerTry.toString() === this.task.answer){
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