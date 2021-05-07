<template>
  <div>
    <b-card no-body>
      <b-card-header v-b-toggle.tab-datasource>
        Data source
      </b-card-header>
      <b-collapse id="tab-datasource" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-radio-group v-model="datasourceType">
            <div>
              <b-radio value="local">Local</b-radio>
            </div>
            <div>
              <b-radio value="url">
                <b-input type="text" v-model="dataUrl"/>
              </b-radio>
            </div>
          </b-radio-group>
          <br/>
          <b-button v-on:click="refresh">Refresh {{ datasourceType }}</b-button>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body>
      <b-card-header v-b-toggle.tab-timerange>
        Time range
      </b-card-header>
      <b-collapse id="tab-timerange" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          Not implemented yet
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body>
      <b-card-header v-b-toggle.tab-easiest-vs-hardest>
        Hardest vs Easiest
      </b-card-header>
      <b-collapse id="tab-easiest-vs-hardest" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div>
            <b-input type="number" v-model="evhPercentile"/>
          </div>
          <table border="1" cellpadding="5">
            <tr>
              <th>Task</th>
              <th>Attempts</th>
              <th>Time</th>
            </tr>
            <template v-for="group in hardVsEasy">
              <tr>
                <th>{{ group.groupName }} ({{group.tasksNum}})</th>
                <th>{{ group.attemptsAvg }}</th>
                <th>{{ group.timeAvg }}</th>
              </tr>
              <tr v-for="tsk in group.easiest" class="easy" :class="tsk.solved?'solved':'non-solved'">
                <td>{{ tsk.taskStr }}</td>
                <td>{{ tsk.attempts }}</td>
                <td>{{ tsk.time }}s</td>
              </tr>
              <tr v-for="tsk in group.hardest" class="hard" :class="tsk.solved?'solved':'non-solved'">
                <td>{{ tsk.taskStr }}</td>
                <td>{{ tsk.attempts }}</td>
                <td>{{ tsk.time }}s</td>
              </tr>
            </template>

          </table>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import _ from 'lodash'
import MyBarChart from "./MyBarChart";
import {arrangeLogData} from "./utils/common";
import {cleanData} from "./clean-test-data";
import {exportDB} from "../util/export";

export default {
  name: "ReportMain",
  components: {MyBarChart},
  data() {
    return {
      datasourceType: 'url',
      dataUrl: "https://raw.githubusercontent.com/serg-bloim/homework/temp/export/data/export.json",
      data: {},
      evhPercentile: 20,
      cleanData: cleanData,
      failedAttempts: {},
      attemptsPerTaskType: {},
      attemptsPerTask2: {
        '2021-04-20': {
          'minus': {
            attempts: {avg: 10}
          },
          'sum': {
            attempts: {avg: 5}
          },
        },
        '2021-04-21': {
          'sum': {
            attempts: {avg: 3}
          },
          'minus': {
            attempts: {avg: 7}
          }
        }
      },
      chartdata: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      chartOptions: {}
    }
  },
  mounted() {
    this.loadData()
    this.refresh()
  },
  methods: {
    loadData() {
      this.data = {
        homeworks: [],
        tasks: [],
        log: []
      }
    },
    refresh() {
      if (this.datasourceType === 'url') {
        fetch(this.dataUrl)
            .then(resp => resp.json())
            .then(json => this.data = json)
            .catch(err => console.log(err))
      } else if (this.datasourceType === 'local') {
        exportDB().then(data => this.data = data)
      }
    }
  },
  computed: {
    hardVsEasy() {
      let data = arrangeLogData(this.data).map(group => {
        let groupName = group.groupName
        let tasks = _.sortBy(group.tasks, tsk => tsk.totalTime).map(tsk => {
          let taskStr = tsk.taskStr
          let attempts = tsk.attemptsNum
          let solved = tsk.solved
          let time = _.round(tsk.totalTime / 1000, 1)
          let tid = tsk.taskId
          return {
            tid,
            taskStr,
            attempts,
            solved,
            time
          }
        })
        let n = Math.ceil(tasks.length * this.evhPercentile / 100)
        let easiest = _.take(tasks, n)
        let hardest = _.takeRight(tasks, n)

        const taskAvgStat = (stat) => {
          let dropN = Math.floor(this.evhPercentile / 100 * tasks.length)
          let vals = _.sortBy(tasks.map(tsk => tsk[stat])).slice(dropN, tasks.length - dropN)
          return _.round(_.sumBy(vals) / vals.length, 2)
        }

        let attemptsAvg = taskAvgStat('attempts')
        let timeAvg = taskAvgStat('time')
        let tasksNum = tasks.length
        return {groupName, easiest, hardest, attemptsAvg, timeAvg, tasksNum}
      })
      return data
    }
  }
}
</script>

<style scoped>

</style>