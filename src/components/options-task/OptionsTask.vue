<template>
<div>
  {{task.problem}}

  <b-form-group label="Individual radios" v-slot="{ ariaDescribedby }">
    <b-form-radio v-for="(opt,ind) in task.options" :key="opt" v-model="task.selected" :aria-describedby="ariaDescribedby" name="some-radios" :value="ind"><img :src="opt"/></b-form-radio>
  </b-form-group>
</div>
</template>

<script>
import {OptionsTaskDef} from "./options-task";

export default {
  name: "OptionsTask",
  props: {
    task: OptionsTaskDef,
  },
}
</script>

<style scoped>

</style>