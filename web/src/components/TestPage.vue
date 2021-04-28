<template>
  <div>
  Test Page
    <b-button @click="testSound">SoundCheck</b-button>
<!--    <AudioPlayer url="https://raw.githubusercontent.com/serg-bloim/homework/master/data/audio/success.mp3" />-->
<!--    <AudioMatchTaskWindow :task="audioTask" />-->
    <TaskView :homework="audioHomework"/>
<!--    <TaskView :homework="arythmeticsHomework"/>-->
  </div>
</template>

<script>
import ArythmeticsTaskWindow from "./arythmetics-task/ArythmeticsTaskWindow";
import OptionsTask from "./options-task/OptionsTask";
import MyBarChart from "../report/MyBarChart";
import AudioPlayer from "./AudioPlayer";
import AudioMatchTaskWindow from "./AudioMatchTaskWindow";
import {AudioMatchTaskDef} from "homework-common/src/components/AudioMatchTaskDef";
import {ArythmeticsTaskDef} from "homework-common/src/components/ArythmeticsTaskDef";
import TaskView from "./TaskView";
import {Homework} from "homework-common/src/util/homework";
import {Howl} from 'howler'
import {create_seq} from "homework-common/src/util/arrays.js";
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  },{
    label: 'My Second dataset',
    backgroundColor: 'rgb(255, 132, 99)',
    borderColor: 'rgb(255, 132, 99)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};
let tsks = Array.from(create_seq(1,199)).map(n=>new AudioMatchTaskDef(n))
export default {
  name: "TestPage",
  components: {TaskView, ArythmeticsTaskWindow, AudioMatchTaskWindow, AudioPlayer, MyBarChart},
  data(){
    let arythmeticsHomework = new Homework([new ArythmeticsTaskDef("2+2", 4)]);
    let audioHomework = new Homework(tsks);
    return{
      audioTask:new AudioMatchTaskDef("https://raw.githubusercontent.com/serg-bloim/homework/master/data/audio/success.mp3"),
      arythmeticsTask:new ArythmeticsTaskDef("2+2", 4),
      audioHomework,
      arythmeticsHomework,
      chartData:data,
      chartOpts:{}
    }
  },
  methods:{
    testSound(){
      let sound = new Howl({
        src: ['https://raw.githubusercontent.com/serg-bloim/homework/master/data/audio/collections/number-serg/20.mp3',
          'https://raw.githubusercontent.com/serg-bloim/homework/master/data/audio/collections/number-serg/6.mp3',],
        autoplay:true,
      })
      sound.play()
    }
  }
}
</script>

<style scoped>

</style>