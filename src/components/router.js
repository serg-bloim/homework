import VueRouter from 'vue-router'
import TaskView from "./TaskView";
import TaskList from "./TaskList";
import taskRepo from "../util/TaskRepo";

const routes = [
    {path: '/task', name:"task", component: TaskView, props:true},
    {path: '/list', component: TaskList, props: {tasks: taskRepo.getTasks()}},
    {path: "/", redirect: "/list"},
]
export default new VueRouter({routes})
