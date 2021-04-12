<template>
  <div>
    <div v-for="h in homeworks" v-bind:key="h.id" :class="classes(h)">{{ h.name }}
      <b-button :disabled="h.isActive()" v-on:click="activateHomework(h)">Activate</b-button>
    </div>
  </div>
</template>

<script>
import HomeworkRepo from "../util/HomeworkRepo";
import {Homework} from "../util/common";

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
      HomeworkRepo.setActive(homework).then(() => this.refresh())
    },
    refresh() {
      HomeworkRepo.getAllHomeworks().then(hws => this.homeworks = hws)
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