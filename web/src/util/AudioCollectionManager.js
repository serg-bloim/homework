import _ from 'lodash'

export class AudioCollection {
    descriptorUrl;
    descriptor=undefined;
    loadPromise;
    constructor(descriptorUrl) {
        this.descriptorUrl = descriptorUrl;
        let base = new URL(descriptorUrl)
        this.loadPromise = fetch(descriptorUrl).then(data=>data.json())
            .then(json => this.descriptor = _.mapValues(json, relUrl => new URL(relUrl, base).toString()))
    }
    getResourceUrl(name){
        if(this.descriptor){
            return this.descriptor[name]
        }
    }
    load(){
        return this.loadPromise
    }
}

export class AudioCollectionManager {
    collections = {
        'alisa': new AudioCollection('https://raw.githubusercontent.com/serg-bloim/homework/master/data/audio/collections/number-alisa/alisa.json'),
        'serg': new AudioCollection('https://raw.githubusercontent.com/serg-bloim/homework/master/data/audio/collections/number-serg/serg.json'),
    }

    getCollection(name) {
        return this.collections[name]
    }
    getCollectionNames(){
        return Object.keys(this.collections)
    }
    getDefaultCollectionName(){
        return this.getCollectionNames()[0]
    }
}

export const audioCollectionManager = new AudioCollectionManager()