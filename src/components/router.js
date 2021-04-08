import VueRouter from 'vue-router'
import TaskView from "./TaskView";
import TaskList from "./TaskList";
import taskRepo from "../util/TaskRepo";
import {generateTaskList} from "../util/generation";
import TestView from "./TestView";

const routes = [
    {path: '/task', name:"task", component: TaskView, props:true},
    {path: '/test', name:"test", component: TestView, props:true},
    {path: '/list', component: TaskList, props: true},
    {path: "/", redirect: "/list"},
]
export default new VueRouter({routes})
