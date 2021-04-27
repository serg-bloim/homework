<template>
<div>
  <b-container class="bv-example-row">
    <b-row>
      <b-col><AudioPlayer :url="task.audioUrl" /></b-col>
    </b-row>
    <b-row>
      <b-col  cols="4"></b-col>
      <b-col  cols="6">  <AnswerInput v-model="task.answer" :state="answerState" v-on:submit="$emit('submit')" class="audio-task-window-answer" /></b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import {AudioMatchTaskDef} from "homework-common/src/components/AudioMatchTaskDef";
import AudioPlayer from "./AudioPlayer";
import AnswerInput from "./AnswerInput";

export default {
  name: "AudioMatchTaskWindow",
  components: {AnswerInput, AudioPlayer},
  props:{
    task:AudioMatchTaskDef
  },
  data(){
    return{
      answerState:null,
    }
  },
  computed:{
    inputStyle(){
      return 'number'
    }
  }
}
</script>

<style scoped>
.audio-task-window-answer {
  font-family: Helvetica;
  font-size: x-large;
}
</style>