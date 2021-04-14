<template>
  <div>
    <div>
      <router-link to="/homeworks">Homeworks</router-link>
    </div>
    <div>
      <b-button v-on:click="generateDate">Generate Data</b-button>
    </div>
    <div>
      <b-input type="text" v-model="importUrl"/>
      <b-button v-on:click="importData">Import</b-button>
    </div>
  </div>
</template>

<script>
import {generateDBData} from "../util/setup";
import {Homework} from "../util/common";
import HomeworkRepo from "../util/HomeworkRepo";

export default {
  name: "Settings",
  data() {
    return {
      importUrl: "/homework/import.json"
    }
  },
  methods: {
    generateDate() {
      generateDBData()
    },
    importData() {
      fetch(this.importUrl).then(r => r.json())
          .then(json => {
            /**
             * @type {Homework[]}
             */
            let hws = json.homeworks.map(Homework.fromPlain)
            console.log(`Importing ${hws.length} homeworks:`)
            for (const hw of hws) {
              HomeworkRepo.addHomework(hw)
                  .then(key =>
                      console.log(`Imported ${key}`))
                  .catch(err => {
                    console.log(`Failed to import ${hw.id}`)
                    console.log(hw)
                    console.log(err)
                  })
            }
          }).catch(console.log)
    },
  }
}
</script>

<style scoped>

</style>