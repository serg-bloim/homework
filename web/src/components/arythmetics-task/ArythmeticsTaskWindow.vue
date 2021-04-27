<template>
  <div ref="bdy">
    <b-container>
      <b-row align-v="center" class="arythmetics-problem">
        <b-col align="right"><span>{{ task.problem }} =</span></b-col>
        <b-col align="left">
          <AnswerInput v-model="task.answer" :state="answerState" @submit="$emit('submit')" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import {ArythmeticsTaskDef} from "homework-common/src/components/ArythmeticsTaskDef";
import AnswerInput from "../AnswerInput";

export default {
  name: "ArythmeticsTaskWindow",
  components: {AnswerInput},
  data: () => ({
    answerTry: undefined,
    answerState: null,
  }),
  props: {
    task: ArythmeticsTaskDef,
  },
  methods: {
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
.arythmetics-problem{
  font-family: Helvetica;
  font-size: x-large;
}

</style>