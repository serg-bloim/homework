const LS_TASK_SOUNDS = "settings.taskSounds";

export function isTaskSounds() {
    return localStorage.getItem(LS_TASK_SOUNDS) !== 'false'
}

export function setTaskSounds(v) {
    localStorage.setItem(LS_TASK_SOUNDS, v)
}