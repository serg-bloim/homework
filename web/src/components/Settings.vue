<template>
  <div>
    <div>
      <router-link to="/homeworks">Homeworks</router-link> {{appVersion}}
      <br/>
    </div>
    <div>
      <b-input type="text" v-model="importUrl"/>
      <b-button v-on:click="importData">Import</b-button>
      <div :class="importStatusClass">{{importStatusText}}</div>
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
    <div>
      <b-checkbox v-model="taskSounds">Task Sounds</b-checkbox>
    </div>
    <div>
      <p>Audio collection:</p>
      <b-form-select v-model="audioCollectionName" :options="audioCollectionOptions"></b-form-select>
    </div>
    <router-link to="/report">Report</router-link>
  </div>
</template>

<script>
import HomeworkRepo from "../util/HomeworkRepo";
import GitHub from "github-api";
import {initGitHub, LS_GITHUB_TOKEN} from "../util/github";
import {appVersion} from "../util/version";
import {Homework} from "homework-common/src/util/homework";
import {isNullUndefinedEmpty} from "homework-common/src/util/isNullUndefinedEmpty";
import {getAudioCollectionName, isTaskSounds, setAudioCollectionName, setTaskSounds} from "../util/common-settings";
import {exportDB} from "../util/export";
import {audioCollectionManager} from "../util/AudioCollectionManager.js";

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
      exportPath: localStorage.getItem(LS_EXPORT_PATH) ?? 'data/export.json',
      taskSounds: isTaskSounds(),
      audioCollectionName:getAudioCollectionName(),
      audioCollectionOptions:audioCollectionManager.getCollectionNames(),
      importStatusText: '',
      importStatusSuccess: false,
      audioCollectionManager:audioCollectionManager,
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
    taskSounds(newV, oldV){
      setTaskSounds(newV)
    },
    audioCollectionName(newV, oldV){
      setAudioCollectionName(newV)
    }
  },
  methods: {
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
                    this.importStatusText = 'Success'
                    this.importStatusSuccess = true
                  })
                  .catch(err => {
                    console.log(`Failed to import ${hw.id}`)
                    console.log(hw)
                    console.log(err)
                    this.importStatusText = 'Failed'
                    this.importStatusSuccess = false
                  })
            }
          }).catch(console.log)
    },
    fetchGHRepos() {
      return [];
    },
    exportFile() {
      exportDB()
      .then(data=>{
        const gh = new GitHub({
          token: this.exportToken,
        });
        let dataStr = JSON.stringify(data, null, 2)
        gh.getRepo("serg-bloim", this.exportRepo).writeFile(this.exportBranch, this.exportPath, dataStr, 'Export database state', {encode: true}).then(console.log)
      })
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