<template>
  <div>
    Generate homework
    <b-card no-body>
      <b-card-header v-b-toggle.tab-settings>
        Settings
      </b-card-header>
      <b-collapse id="tab-settings" accordion="generate-accordion" role="tabpanel">
        <b-card-body>
          Not implemented yet
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body>
      <b-card-header v-b-toggle.tab-config>
        Config
      </b-card-header>
      <b-collapse id="tab-config" visible accordion="generate-accordion" role="tabpanel">
        <b-card-body>
          <b-form-textarea
              id="textarea"
              v-model="configText"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
          ></b-form-textarea>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body>
      <b-card-header v-b-toggle.tab-generate>
        Generate
      </b-card-header>
      <b-collapse id="tab-generate" visible accordion="generate-accordion" role="tabpanel">
        <b-card-body>
          <b-button @click="generate">Generate</b-button>
          <b-form-textarea
              id="textarea"
              v-model="generatedText"
              readonly
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
          ></b-form-textarea>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
const defConfig = JSON.stringify({
  name: "Today's homework",
  factories: [
    {
      __class: "SumTaskFactory",
      num: 3,
      params: ["5", "10"]
    }, {
      __class: "MinusTaskFactory",
      num: 3,
      params: ["5", "10"]
    },
  ]
}, null, 2)
export default {
  name: "GeneratePage",
  data() {
    return {
      configText: defConfig,
      generatedText: "",
    }
  },
  methods:{
    generate(){
      let config = JSON.parse(this.configText);
      let home
    }
  }
}
</script>

<style scoped>

</style>