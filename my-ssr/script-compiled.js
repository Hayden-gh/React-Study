//引入官方库
import { matchRoutes } from "react-router-config";
import routes from './routes-config.js';
const path = req.path;
const branch = matchRoutes(routes, path); //得到要渲染的组件

const Component = branch[0].route.component; //node server 

http.createServer((req, res) => {
  const url = req.url; //简单容错，排除图片等资源文件的请求

  if (url.indexOf('.') > -1) {
    res.end('');
    return false;
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  const data = fetch(); //查找组件

  const branch = matchRoutes(routes, url); //得到组件

  const Component = branch[0].route.component; //将组件渲染为 html 字符串

  const html = renderToString( /*#__PURE__*/React.createElement(Component, {
    data: data
  }));
  res.end(html);
}).listen(8080); // const React = require('react');
// const http = require('http');
// const {
//     renderToString
// } = require('react-dom/server')
// class Index extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <h1>{this.props.data.title}</h1>
//     }
// }
// const fetch = () => {
//     return {
//         title: 'react ssr',
//         data: [],
//     }
// }
// http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         const data = fetch()
//         const html = renderToString(<Index data={data} />)
//         res.end(html)
//     }
// }).listen(8080)
