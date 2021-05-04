import uuidv4 from 'uuid/v4.js'
import random from 'random'

export function renderArythmeticTask(problem, correctAnswer) {
    return {
        id: uuidv4(),
        type: "none",
        __class: "ArythmeticsTaskDef",
        __ver: "2",
        correctAnswer: correctAnswer,
        problem: problem,
        __hash: problem
    };
}

export function rand(min, max) {
    return random.int(min, max)
}

export function tomorrow(date) {
    let day = 24 * 60 * 60 * 1000;
    return new Date(date.getTime() + day)
}