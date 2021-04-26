import VueRouter from 'vue-router'
import TaskView from "./TaskView";
import TaskList from "./TaskList";
import HomeworksBrowser from "./HomeworksBrowser";
import Settings from "./Settings";
import DataServices from "./DataServices";
import TestPage from "./TestPage";
import ReportMain from "../report/ReportMain";

const routes = [
    {path: '/task', name:"task", component: TaskView, props:true},
    {path: '/list', component: TaskList, props: true},
    {path: '/homeworks', component: HomeworksBrowser, props: true},
    {path: '/settings', component: Settings, props: true},
    {path: '/data-services', component: DataServices},
    {path: '/test', component: TestPage},
    {path: '/report', component: ReportMain},
    {path: "/", redirect: "/homeworks"},
]
export default new VueRouter({routes})
