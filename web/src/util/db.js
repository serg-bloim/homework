import Dexie from "dexie";

export const db = new Dexie('MyDatabase');

/**
 * @type {Dexie.Table}
 */
db.homeworks;

/**
 * @type {Dexie.Table}
 */
db.tasks;

/**
 * @type {Dexie.Table}
 */
db.logs;
