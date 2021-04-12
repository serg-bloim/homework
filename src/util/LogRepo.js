import {db} from "./db";

export function log(type, msg, target, data) {
    let timestamp = Date.now();
    db.logs.put({timestamp, type, msg, target, data})
}