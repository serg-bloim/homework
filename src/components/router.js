import VueRouter from 'vue-router'
import TaskView from "./TaskView";
import TaskList from "./TaskList";
import HomeworksBrowser from "./HomeworksBrowser";
import Settings from "./Settings";
import DataServices from "./DataServices";

const routes = [
    {path: '/task', name:"task", component: TaskView, props:true},
    {path: '/list', component: TaskList, props: true},
    {path: '/homeworks', component: HomeworksBrowser, props: true},
    {path: '/settings', component: Settings, props: true},
    {path: '/data-services', component: DataServices},
    {path: "/", redirect: "/homeworks"},
]
export default new VueRouter({routes})
