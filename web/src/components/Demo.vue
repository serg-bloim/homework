<template>
<div>

  dataUrl:[{{dataUrl}}]
  dataUrl:[{{$route.query.dataUrl}}]


</div>
</template>

<script>
import {debug} from "homework-common/src/util/basic.js";
import {Homework} from "homework-common/src/util/homework.js";
import HomeworkRepo from "../util/HomeworkRepo.js";

export default {
  name: "Demo",
  props: {
    dataUrl: String
  },
  mounted() {
    debug(this.$route.query.dataUrl)

    fetch(this.$route.query.dataUrl).then(r => r.json())
        .then(json => {
          /**
           * @type {Homework[]}
           */
          let hws = json.homeworks.map(Homework.fromPlain)
          console.log(`Importing ${hws.length} homeworks:`)
          Promise.all(
              hws.map(hw =>
                  HomeworkRepo.addHomework(hw)
                      .then(key => {
                        console.log(`Imported ${key}`)
                        return hw
                      })
                      .catch(err => {
                        console.log(`Failed to import ${hw.id}`)
                        console.log(hw)
                        console.log(err)
                      })
              )
          ).then(() => this.$router.push('/'))
        })
  }
}
</script>

<style scoped>

</style>