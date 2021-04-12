import VueRouter from 'vue-router'
import TaskView from "./TaskView";
import TaskList from "./TaskList";
import HomeworksBrowser from "./HomeworksBrowser";

const routes = [
    {path: '/task', name:"task", component: TaskView, props:true},
    {path: '/list', component: TaskList, props: true},
    {path: '/homeworks', component: HomeworksBrowser, props: true},
    {path: "/", redirect: "/homeworks"},
]
export default new VueRouter({routes})
