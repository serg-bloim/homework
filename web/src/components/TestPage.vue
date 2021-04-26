<template>
  <div>
  Test Page
    <MyBarChart :chartdata="chartData" :options="chartOpts"/>
  </div>
</template>

<script>
import ArythmeticsTaskWindow from "./arythmetics-task/ArythmeticsTaskWindow";
import OptionsTask from "./options-task/OptionsTask";
import MyBarChart from "../report/MyBarChart";
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  },{
    label: 'My Second dataset',
    backgroundColor: 'rgb(255, 132, 99)',
    borderColor: 'rgb(255, 132, 99)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};
export default {
  name: "TestPage",
  components: {MyBarChart},
  data(){
    return{
      chartData:data,
      chartOpts:{}
    }
  },
}
</script>

<style scoped>

</style>