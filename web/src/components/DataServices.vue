<template>
  <div>
    <div>
      <router-link to="/settings">Settings</router-link>
      <br/><br/>
    </div>
    <div>
      <b-button v-on:click="upgradeData">Upgrade Data</b-button>
    </div>
    <div>
      <b-input type="text" v-model="restoreUrl"/>
      <b-button v-on:click="restoreData">Restore</b-button>
      <div :class="importStatusClass">{{importStatusText}}</div>
    </div>
  </div>
</template>

<script>
import {upgradeDBData} from "../util/setup";
import HomeworkRepo from "../util/HomeworkRepo";
import GitHub from "github-api";
import {db} from "../util/db";
import {initGitHub, LS_GITHUB_TOKEN} from "../util/github";
import {appVersion} from "../util/version";
import {Homework} from "homework-common/src/util/homework";
import {isNullUndefinedEmpty} from "homework-common/src/util/isNullUndefinedEmpty";

const LS_IMPORT_URL = "settings.importUrl";
const LS_EXPORT_REPO = "settings.exportRepo";
const LS_EXPORT_BRANCH = "settings.exportBranch";
const LS_EXPORT_PATH = "settings.exportPath";

export default {
  name: "DataServices",
  data() {
    return {
      appVersion: appVersion,
      restoreUrl: localStorage.getItem(LS_IMPORT_URL) ?? "/homework/import.json",
      exportToken: localStorage.getItem(LS_GITHUB_TOKEN) ?? '',
      exportRepo: localStorage.getItem(LS_EXPORT_REPO) ?? 'homework',
      exportBranch: localStorage.getItem(LS_EXPORT_BRANCH) ?? 'master',
      exportPath: localStorage.getItem(LS_EXPORT_PATH) ?? 'data/export.json',
      importStatusText: '',
      importStatusSuccess: false
    }
  },
  computed: {
    importStatusClass() {
      if (isNullUndefinedEmpty(this.importStatusText)) {
        return 'settings-importstataus-none'
      } else {
        return this.importStatusSuccess ? 'settings-importstataus-success' : 'settings-importstataus-failure'
      }
    }
  },
  watch: {
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
    upgradeData() {
      upgradeDBData()
    },
    restoreData(){
      fetch(this.restoreUrl).then(r => r.json())
          .then(json => {
            for(let collection of ['homeworks', 'tasks', 'logs'] ){
                db[collection].bulkPut(json[collection])
            }
          }).catch(console.log)
    },
  },
}
</script>

<style scoped>
.settings-importstataus-none{
  display: none;
}
.settings-importstataus-success{
  background-color: lightgreen;
}
.settings-importstataus-failure{
  background-color: palevioletred;
}
</style>