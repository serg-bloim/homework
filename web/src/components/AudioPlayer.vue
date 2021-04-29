<template>
<div>
  <b-img src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Audio-512.png" width="64" height="64" v-on:click="play"/>
</div>
</template>

<script>
import {Howl} from 'howler';

function playSequentially(urls){
  if(urls.length > 0) {
    let sounds = urls.map(u => new Howl({src: [u]}));
    for (let i = 1; i < sounds.length; i++) {
      sounds[i - 1].on('end', function () {
        sounds[i].play()
      })
    }
    sounds[0].play()
  }
}

export default {
  name: "AudioPlayer",
  props:{
    urls:Array
  },
  methods:{
    play(){
      playSequentially(this.urls)
    }
  },
  watch:{
    urls(newV, oldV){
      this.audio = new Howl({src: newV,autoplay: true})
    }
  }
}
</script>

<style scoped>

</style>