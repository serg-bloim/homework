<template>
  <div>
    <div>
      <router-link to="/homeworks">Homeworks</router-link> {{appVersion}}
    </div>
    <div>
      <b-button v-on:click="generateDate">Generate Data</b-button>
    </div>
    <div>
      <b-input type="text" v-model="importUrl"/>
      <b-button v-on:click="importData">Import</b-button>
    </div>
    <div>
      <p>Github token:</p>
      <b-input type="text" v-model="exportToken"/>
      <p>Repo:</p>
      <b-input type="text" v-model="exportRepo"/>
      <p>Branch:</p>
      <b-input type="text" v-model="exportBranch"/>
      <p>Path:</p>
      <b-input type="text" v-model="exportPath"/>

      <b-button v-on:click="exportFile">Export</b-button>
    </div>
  </div>
</template>

<script>
import {generateDBData} from "../util/setup";
import {Homework} from "../util/common";
import HomeworkRepo from "../util/HomeworkRepo";
import GitHub from "github-api";
import {db} from "../util/db";
import {initGitHub, LS_GITHUB_TOKEN} from "../util/github";
import {appVersion} from "../util/version";

const LS_IMPORT_URL = "settings.importUrl";
const LS_EXPORT_REPO = "settings.exportRepo";
const LS_EXPORT_BRANCH = "settings.exportBranch";
const LS_EXPORT_PATH = "settings.exportPath";

export default {
  name: "Settings",
  data() {
    return {
      appVersion: appVersion,
      importUrl: localStorage.getItem(LS_IMPORT_URL) ?? "/homework/import.json",
      exportToken: localStorage.getItem(LS_GITHUB_TOKEN) ?? '',
      exportRepo: localStorage.getItem(LS_EXPORT_REPO) ?? 'homework',
      exportBranch: localStorage.getItem(LS_EXPORT_BRANCH) ?? 'master',
      exportPath: localStorage.getItem(LS_EXPORT_PATH) ?? 'data/export.json'
    }
  },
  watch:{
    importUrl(newV, oldV){
      localStorage.setItem(LS_IMPORT_URL, newV)
    },
    exportToken(newV, oldV){
      localStorage.setItem(LS_GITHUB_TOKEN, newV)
      initGitHub()
    },
    exportRepo(newV, oldV){
      localStorage.setItem(LS_EXPORT_REPO, newV)
    },
    exportBranch(newV, oldV){
      localStorage.setItem(LS_EXPORT_BRANCH, newV)
    },
    exportPath(newV, oldV){
      localStorage.setItem(LS_EXPORT_PATH, newV)
    },
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
                  .then(key => {
                    console.log(`Imported ${key}`)
                    alert(`Imported a new homework ${hw.name}`)
                  })
                  .catch(err => {
                    console.log(`Failed to import ${hw.id}`)
                    console.log(hw)
                    console.log(err)
                  })
            }
          }).catch(console.log)
    },
    fetchGHRepos() {
      return [];
    },
    exportFile() {
      Promise.all([
        db.homeworks.toArray(),
        db.tasks.toArray(),
        db.logs.toArray()])
          .then(([homeworks, tasks, logs]) => {
            console.log(homeworks)
            console.log(tasks)
            console.log(logs)
            return{
              homeworks, tasks, logs
            }
          })
      .then(data=>{
        const gh = new GitHub({
          token: this.exportToken,
        });
        let dataStr = JSON.stringify(data, null, 2)
        gh.getRepo("serg-bloim", "homework").writeFile("temp/export", 'data/export.json', dataStr, 'Export database state', {encode: true}).then(console.log)
      })
    },
  },
}
</script>

<style scoped>

</style>