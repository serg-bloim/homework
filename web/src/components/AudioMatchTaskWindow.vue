<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <AudioPlayer ref="player" :urls="audioSegments"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="6">
          <AnswerInput v-model="task.answer" :state="answerState" v-on:submit="$emit('submit')"
                       class="audio-task-window-answer"/>
        </b-col>
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
import _ from 'lodash'

let audioCollection = audioCollectionManager.getCollection(getAudioCollectionName())
export default {
  name: "AudioMatchTaskWindow",
  components: {AnswerInput, AudioPlayer},
  props: {
    task: AudioMatchTaskDef
  },
  data() {
    return {
      answerState: null,
      audioCollection:audioCollection,
      audioSegments:[],
    }
  },
  computed: {
    inputStyle() {
      return 'number'
    },
  },
  methods: {
    play() {
      this.$nextTick(() => {
        debug(`AudioMatchTaskWindow->play(${this.task.expected})`)
        this.$refs.player.play()
      })
    },
    calcAudioSegments() {
      let n = Math.floor(this.task.expected)
      if (n > 199 || n <= 0)
        throw new Error("Number should be in [1, 199]")
      let digits = _.reverse(n.toString().split('').map(i=>parseInt(i)))
      let hundreds = digits[2]
      let tens = digits[1]
      let ones = digits[0]
      if (tens === 1 && ones > 0) {
        tens = undefined
        ones = 10 + ones
      }
      let res = [hundreds*100, tens*10, ones].filter(i=>i).map(s=>audioCollection.getResourceUrl(s)).filter(i=>i);
      return res
    },
  },
  watch: {
    task() {
      this.audioSegments = this.calcAudioSegments()
      this.play()
    }
  },
  mounted() {
    this.audioCollection.load().then(()=> {
          this.audioSegments = this.calcAudioSegments()
          this.play()
        }
    )
  }
}
</script>

<style scoped>
.audio-task-window-answer {
  font-family: Helvetica;
  font-size: x-large;
}
</style>