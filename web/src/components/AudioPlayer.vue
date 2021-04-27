<template>
<div>
  <b-img src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Audio-512.png" width="64" height="64" v-on:click="play"/>
</div>
</template>

<script>

export default {
  name: "AudioPlayer",
  props:{
    url:String
  },
  data(){
    let audio = new Audio(this.url);
    return{
      audio: audio
    }
  },
  methods:{
    play(){
      this.audio.play()
    }
  },
  watch:{
    url(newV, oldV){
      this.audio = new Audio(newV)
    }
  }
}
</script>

<style scoped>

</style>