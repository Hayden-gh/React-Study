import Detail from './components/detail'
import Home from './components/Home'

const routes = [
  
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: '/detail', exact: true,
        component:Detail,
    },
 
];

//导出路由表
export default routes;