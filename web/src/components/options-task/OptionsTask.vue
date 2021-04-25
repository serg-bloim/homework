<template>
  <div>
    <div class="options-task-problem">{{ task.problem }}</div>
    <b-form-group label="" v-slot="{ ariaDescribedby }">
      <table>
        <tr v-for="r in optionRows">
          <td v-for="c in r">
            <div class="options-task-option">
              <b-form-radio v-model="task.selected"
                            :aria-describedby="ariaDescribedby" name="some-radios" :value="c.ind">
                <img :src="c.option"/>
              </b-form-radio>
            </div>
          </td>
        </tr>
      </table>

    </b-form-group>
  </div>
</template>

<script>


import {OptionsTaskDef} from "homework-common/src/components/OptionsTaskDef";
import _ from 'lodash'

export default {
  name: "OptionsTask",
  props: {
    task: OptionsTaskDef,
  },
  computed:{
    optionRows(){
      return _.chunk(this.task.options.map((option, ind)=> {return {ind, option}}), 2)
    }
  }
}
</script>

<style scoped>

table img{
  width: 170px;
}
.options-task-problem{
  font-size: x-large;
  margin-bottom: 30px;
}
</style>