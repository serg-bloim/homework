<template>
  <div class="answer-input-container">
            <span class="answer-input">
          <b-form-input autofocus ref="answerinput"
                        type="number"
                        v-bind:value="value"
                        v-on:input="propagate"
                        v-on:keypress.enter="$emit('submit')"
                        v-on:blur="focus_answer"
                        :state="answerState"
                        placeholder="???" class="answer-input"/>
        </span>
    <b-button v-on:click="propagate('');focus_answer()">C</b-button>
  </div>
</template>

<script>
import {debug} from 'homework-common/src/util/basic';
export default {
  name: "AnswerInput",
  props:{
    value:String,
    autofocus:Boolean,
    answerState:String
  },
  methods:{
    focus_answer() {
      this.$refs.answerinput.$el.focus();
    },
    dbg(str){
      debug(str)
    },
    propagate(v){
      this.$emit('input', v)
    }
  }
}
</script>

<style scoped>
.answer-input-container {
  display: flex;
  justify-content: space-between;
}
.answer-input {
  font-family: inherit;
  font-size: inherit;
}

input.answer-input {
  width: 100px;
  display: inline-block;
}

</style>