import {testdata} from "./test-data";
import _ from 'lodash'
import "homework-common/src/util/arrays";
import dateFormat from 'dateformat'
import {debug} from "homework-common/src/util/basic";


export const evhTestData = [{
    groupName: '123',
    easiest: [{
        taskStr: '2+2 = 4',
        attempts: 0,
        solved: true,
        time: 5.5,
    }, {
        taskStr: '5 + 0 = 5',
        attempts: 0,
        solved: true,
        time: 3,
    }
    ],
    hardest: [{
        taskStr: '32-17 = 15',
        attempts: 4,
        solved: false,
        time: 60,
    }],
}, {
    groupName: '456',
    easiest: [],
    hardest: [],
}]

export const cleanData = function () {
    let logsByTask = _.mapValues(_.groupBy(testdata.logs, l => l.target), (logs, tid) => {
        let attemptsNum = logs.findIndex(l => l.data.correct) + 1
        let solved = attemptsNum > 0
        let timestamp = logs[0].timestamp
        let totalTime = _.sumBy(solved ? _.take(logs, attemptsNum): logs, l=>l.data.attemptTime)

        return {taskId: tid, timestamp, solved, totalTime, attemptsNum, logs}
    })
    let tasksByGroup = Object.values(_.mapValues(Object.values(logsByTask).groupBy(t => dateFormat(new Date(t.timestamp), 'yyyy-mm-dd')),
        (tasks, groupName) =>({groupName, tasks})
        ))
    debug(tasksByGroup)
    return tasksByGroup
}()