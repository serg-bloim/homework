<template>
  <div>
    <div>
      <router-link to="/list">To active homework</router-link>
    </div>
    <div>
      <router-link to="/settings">Settings</router-link>
    </div>
    <div v-for="h in homeworks" v-bind:key="h.id" :class="classes(h)">{{ h.name }}
      <b-button :disabled="h.isActive()" v-on:click="activateHomework(h)">Activate</b-button>
    </div>
  </div>
</template>

<script>
import HomeworkRepo from "../util/HomeworkRepo";
import {Homework} from "homework-common/src/util/homework";
import _ from 'lodash'

export default {
  name: "HomeworksBrowser",
  data() {
    return {
      homeworks: []
    }
  },
  methods: {
    /**
     * @param {Homework} h
     */
    classes(h) {
      switch (h.status) {
        case Homework.STATUS.ACTIVE:
          return ['hwbrowser-active']
        case Homework.STATUS.NEW:
          return ['hwbrowser-new']
        case Homework.STATUS.SOLVED:
          return ['hwbrowser-solved']
        default:
          return []
      }
    },
    activateHomework(homework) {
      HomeworkRepo.setActive(homework).then(() => {
        this.refresh();
        this.$emit('update-active-homework', homework)
      })
    },
    refresh() {
      HomeworkRepo.getAllHomeworks().then(hws => this.homeworks = _.orderBy(hws,hw=>hw.name, 'desc'))
    },
  },
  mounted() {
    this.refresh()
  }
}
</script>

<style scoped>
.hwbrowser-new {
  background-color: lightskyblue;
}

.hwbrowser-active {
  background-color: cornflowerblue;
}

.hwbrowser-solved {
  background-color: darkseagreen;
}
</style>