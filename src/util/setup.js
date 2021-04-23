import {db} from "./db";
import {v4 as uuidv4} from 'uuid'
import {generateTaskList} from "./generation";
import {create_array} from "./arrays";
import _ from 'lodash'
import {Homework} from "./homework";

export function setup() {
    db.version(1).stores({
        homeworks: 'id, status, class',
        tasks: 'id, solved, state',
        logs: '++id, timestamp, type, target'
    });
    db.open()
}

export function upgradeDBData() {
    const VERSION_1 = '1'

    function upgradeHW(hw) {
        function upgradeNoneTo1(hw) {
            hw.__ver = VERSION_1
            console.log(`homeworks[${hw.id}].__ver=${VERSION_1}`)
            for (const task of hw.tasks) {
                task.__ver = VERSION_1
                console.log(`homeworks[${hw.id}].tasks[].__ver=${VERSION_1}`)
            }
        }

        let ver = hw.__ver
        if (ver === undefined) {
            upgradeNoneTo1(hw)
        }
    }

    function upgradeTasks(task) {
        function upgradeNoneTo1(task) {
            task.__ver = VERSION_1
            console.log(`tasks[${task.id}].__ver=${VERSION_1}`)
        }

        let ver = task.__ver
        if (ver === undefined) {
            upgradeNoneTo1(task)
        }
    }

    let col1 = db.logs.where({type:'task-answer'});
    col1.toArray().then(logs=> {
        for(let i = 1; i < logs.length; i++){
            let timeDiff = logs[i].timestamp - logs[i-1].timestamp
            logs[i].timediff = timeDiff
        }
        let logsMap = _.keyBy(logs, l=>l.id)
        function upgradeLogs(log) {
            function upgradeNoneTo1(log) {
                log.__ver = VERSION_1
                console.log(`logs[${log.id}].__ver=${VERSION_1}`)
                if(log.data.attemptTime === undefined){
                    let timediff = logsMap[log.id].timediff ?? 0
                    if (timediff > 100*1000){ // > 100 sec
                        timediff = 0
                    }
                    log.data.attemptTime = timediff
                    console.log(`logs[${log.id}].data.attemptTime=${timediff}`)
                }
            }

            let ver = log.__ver
            if (ver === undefined) {
                upgradeNoneTo1(log)
            }
        }
        Promise.all([
            db.homeworks.toCollection().modify(upgradeHW),
            db.tasks.toCollection().modify(upgradeTasks),
            db.logs.toCollection().modify(upgradeLogs),
        ]).then(
            alert("Data has been upgraded")
        ).catch(function (error) {
            alert("Ooops: " + error);
        })
    })

}