<template>
  <div ref="bdy">
    <b-container>
      <b-row align-v="center">
        <b-col align="right"><span class="arythmetics-task arythmetics-problem">{{ task.problem }} =</span></b-col>
        <b-col align="left">
          <div class="arythmetics-answer-col">
            <span class="arythmetics-task arythmetics-answer">
          <b-form-input autofocus ref="answerinput"
                        type="number"
                        v-model="task.answer"
                        v-on:keypress="submit_keypress"
                        v-on:blur="focus_answer"
                        :state="answerState"
                        placeholder="???" class="arythmetics-task"/>
        </span>
            <b-button v-on:click="task.answer='';focus_answer()">C</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {ArythmeticsTaskDef} from "./common";

export default {
  name: "ArythmeticsTaskWindow",
  data: () => ({
    answerTry: undefined,
    answerState: null,
  }),
  props: {
    task: ArythmeticsTaskDef,
  },
  methods: {
    submit_keypress(e) {
      if (e.keyCode === 13) {
        this.$emit("submit")
      }
    },
    focus_answer() {
      this.$refs.answerinput.$el.focus();
    },
  },
  watch: {
    task() {
      this.answerState = null
    }
  }
};
</script>

<style type="text/css">
.arythmetics-task {
  font-family: Helvetica;
  font-size: x-large;
}

input.arythmetics-task {
  width: 100px;
  display: inline-block;
}

.arythmetics-answer-col {
  display: flex;
  justify-content: space-between;
}
</style>