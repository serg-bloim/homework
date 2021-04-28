import {audioCollectionManager} from "./AudioCollectionManager.js";

const LS_TASK_SOUNDS = "settings.taskSounds";
const LS_AUDIO_COLLECTION_NAME = "settings.audio.collection";

export function isTaskSounds() {
    return localStorage.getItem(LS_TASK_SOUNDS) !== 'false'
}

export function setTaskSounds(v) {
    localStorage.setItem(LS_TASK_SOUNDS, v)
}

export function getAudioCollectionName() {
    return localStorage.getItem(LS_AUDIO_COLLECTION_NAME) ?? audioCollectionManager.getDefaultCollectionName()
}

export function setAudioCollectionName(v) {
    localStorage.setItem(LS_AUDIO_COLLECTION_NAME, v)
}

