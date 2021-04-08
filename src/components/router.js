import VueRouter from 'vue-router'
import TaskView from "./TaskView";
import TaskList from "./TaskList";

const routes = [
    {path: '/task', name:"task", component: TaskView, props:true},
    {path: '/list', component: TaskList, props: true},
    {path: "/", redirect: "/list"},
]
export default new VueRouter({routes})
