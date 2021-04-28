<template>
<div>
  <b-container class="bv-example-row">
    <b-row>
      <b-col><AudioPlayer ref="player" :url="audioCollection.getResourceUrl(task.expected)" /></b-col>
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
import {debug} from "homework-common/src/util/basic.js";
import {audioCollectionManager, AudioCollectionManager} from "../util/AudioCollectionManager.js";
import {getAudioCollectionName} from "../util/common-settings.js";

export default {
  name: "AudioMatchTaskWindow",
  components: {AnswerInput, AudioPlayer},
  props:{
    task:AudioMatchTaskDef
  },
  data(){
    return{
      answerState:null,
      audioCollection: audioCollectionManager.getCollection(getAudioCollectionName())
    }
  },
  computed:{
    inputStyle(){
      return 'number'
    }
  },
  methods:{
    play(){
      this.$nextTick(()=>{
        debug(`AudioMatchTaskWindow->play(${this.task.expected})`)
        this.$refs.player.play()
      })

    }
  },
  watch:{
    task(){
      this.play()
    }
  },
  mounted() {
    this.play()
  }
}
</script>

<style scoped>
.audio-task-window-answer {
  font-family: Helvetica;
  font-size: x-large;
}
</style>