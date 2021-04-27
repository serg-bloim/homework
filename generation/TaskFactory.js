import uuidv4 from "uuid/v4.js";

export class TaskFactory {
    create() {
        throw new Error('You have to implement the method!');
    }

    createBase(clazz, version) {
        return {
            id: uuidv4(),
            type: "none",
            __class: clazz,
            __ver: version
        };
    }
}