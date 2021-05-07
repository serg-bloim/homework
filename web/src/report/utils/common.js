import _ from "lodash";
import dateFormat from "dateformat";
import {debug} from "homework-common/src/util/basic";

const DOMAIN_ARITHMETIC = 'type/arithmetic'
const PLUS_BUCKETS = [5, 10, 15, 20]
export function defineTaskType(data) {
    const domain = DOMAIN_ARITHMETIC
    switch (domain) {
        case DOMAIN_ARITHMETIC: {
            let m = data.problem.match(/(-?\d+) (\+|-) (-?\d+)/)
            let operation = data.problem.includes("+") ? 'plus' : 'minus'
            if(operation === 'plus'){
                for (let bucket of PLUS_BUCKETS){
                    if(data.expected <= bucket){
                        return `${operation}-${bucket}`
                    }
                }
            }
            return operation
        }
        default: return 'none'
    }
}

export function getTaskTypesSorted() {
    return PLUS_BUCKETS.map(b=>`plus-${b}`).concat('plus', 'minus')
}
export function arrangeLogData(data) {
    let logsByTask = _.mapValues(_.groupBy(data.logs, l => l.target), (logs, tid) => {
        let attemptsNum = logs.findIndex(l => l.data.correct) + 1
        let solved = attemptsNum > 0
        let timestamp = logs[0].timestamp
        let totalTime = _.sumBy(solved ? _.take(logs, attemptsNum): logs, l=>l.data.attemptTime)
        let lastLog = logs.last();
        let taskStr = lastLog?.data?.msg !== undefined ? lastLog.data.msg : lastLog.msg
        return {taskId: tid, taskStr, timestamp, solved, totalTime, attemptsNum, logs}
    })
    let tasksByGroup = Object.values(_.mapValues(Object.values(logsByTask).groupBy(t => dateFormat(new Date(t.timestamp), 'yyyy-mm-dd')),
        (tasks, groupName) =>({groupName, tasks})
    ))
    return tasksByGroup
}