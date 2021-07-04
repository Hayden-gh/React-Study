#React Router 学习

官方文档：https://reactrouter.com/web/guides/quick-start

###一、前言

React Router目前已经更新到了V5版本，其中从V4版本开始和之前的版本有了较大的差异，本文便是从基于V5版本的学习记录。

###二、React Router 介绍

#### 1.组件

React Router 中的组件主要分为三类：
- 路由器，例如`<BrowserRouter>`和`<HashRouter>`
- 路由匹配器，例如`<Route>`和`<Switch>`
- 导航，例如`<Link>`，`<NavLink>`和`<Redirect>`

#### 2.路由器

`react-router-dom`提供的路由器有两个，分别是`<BrowserRouter>`和`<HashRouter>`。二者分别history模式和hash模式
- history模式是利用了HTML5中的 `pushState()` 和 `replaceState()` 方法对历史记录进行修改,但是不会主动触发浏览器重新加载页面，但在刷新时要保证服务器有url对应的页面。
- hash模式下url中会带有`#`，`#`后的路由将不会包含在请求中，因此当改变时也不会重新加载页面。


###三、基础用法

####1.安装并引入组件

使用React Router之前需要先安装
````
npm install react-router-dom
````

在app.js中引入组件BrowserRouter，Route
````
import { BrowserRouter, Route } from "react-router-dom";
````

####2.编写组件和路由配置

编写路由代码，其中最基本的两个属性就是path：路由的路径，component：该路由渲染的组件，如下面的例子，定义了两个路由`/`和`/first`，对应的组件分别是home，first。
````
const home = () => {
  return (
    <div>
      <h1>home page</h1>
    </div>
  );
};

const hello = (
  {
    match: {
      params: { name },
    },
  }
) => {
  return (
    <div>
      <h1>hello, {name}</h1>
    </div>
  );
};
````
````
<BrowserRouter>
    <Route path="/" component={home} />
    <Route path="/hello" component={hello} />
    <Route path="/welcome" render={() => <h1>Welcome!</h1>} />
</BrowserRouter>
````
这样写会造成一个问题，由于`/first`中也包含了`/`，所以无论如何都会匹配到`/`并渲染`home`组件，因此在应该添加一个新属性`exact`这个属性会使路由路径完全匹配时才会生效。
````
<BrowserRouter>
    <Route path="/" exact component={home} />
    <Route path="/hello" component={hello} />
    <Route path="/welcome" render={() => <h1>Welcome!</h1>} />
</BrowserRouter>
````

####3.添加导航跳转

添加跳转链接，对配置完的路由进行测试
````
function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/hello">hello（a）</a>
          </li>
          <li>
            <Link to="/hello">hello（Link）</Link>
          </li>
          <li>
            <Link to="/welcome">welcome</Link>
          </li>
          <li>
            <NavLink to="/welcome" activeClassName="light">welcome（NacLink）</NavLink>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={home} />
      <Route path="/hello" component={hello} />
      <Route path="/welcome" render={() => <h1>Welcome!</h1>} />
    </BrowserRouter>
  );
}
````
`Link`组件实现路由之间的跳转，相较于`<a>`标签，`Link`组件并不会刷新页面。
`<NavLink>`相比之`Link`的不同之处在于当它匹配当前页面路由时可以通过`activeClassName`配置`active`样式。
````
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/hello">hello（a）</a>
          </li>
          <li>
            <Link to={`/hello/${name}`}>hello（Link）</Link>
          </li>
          <li>
            <Link to="/welcome">welcome</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={home} />
      <Route path="/hello/:name" component={hello} />
      <Route path="/welcome" render={() => <h1>Welcome!</h1>} />
    </BrowserRouter>
````
路由配置时可以在路径中添加传递参数，如上面`/hello/:name`中定义了一个`name`参数，然后`hello`组件中就可以通过`props.match.params.name`获取参数值。
````
const hello = (
  {
    match: {
      params: { name },
    },
  }
) => {
  return (
    <div>
      <h1>hello, {name}</h1>
    </div>
  );
};
````
除了通过`Link`进行路由跳转之外也可以通过js中的`history.push`进行路由跳转
````
const home = ({ history }) => {
  let name = 'tom'
  return (
    <div>
      <h1>home page</h1>
      <button onClick={() => history.push(`/hello/${name}`)}>Go to hello</button>
    </div>
  );
};
````

####4.路由重定位

`Redirect`组件可以在组件内进行重定位（强制跳转），例如下面的例子当`name`不为`tom`的时候将重定位到`/`。
````
const hello = (
  {
    match: {
      params: { name },
    },
  }
) => {
  return (
    <div>
      {name !== "tom" ? <Redirect to="/" /> : null}
      <h1>hello, {name}</h1>
    </div>
  );
};
````
`<Switch>`组件可以使在路由匹配时只能匹配到一个路由，在匹配到第一个路由之后就停止匹配。通过这个特性，我们可以通过添加一个空路由，使当匹配不到路由时显示404页面。

````
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/hello/:name" component={hello} />
        <Route path="/welcome" render={() => <h1>Welcome!</h1>} />
        {/*404 page*/}
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
````

####5.路由守卫拦截

当应用对权限管理有要求的时候，可以结合js逻辑只渲染该权限下可访问的路由，实现路由守卫功能。
````
<Switch>
        <Route path="/" exact component={home} />
        <Route path="/hello/:name" component={hello} />
        {isAdmin ? <Route path="/welcome" render={() => <h1>Welcome!</h1>} /> : null}
        {/*404 page*/}
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
````

####6.Router hooks

`Router hooks`提供了四个钩子函数，可以使我们更方便的使用路由，首先`useParams`可以直接获取路由参数。
````
const Hello = () => {
  const { name } = useParams();
  return (
    <div>
      {name !== "tom" ? <Redirect to="/" /> : null}
      <h1>hello, {name}</h1>
    </div>
  );
};
````
`useHistory`可以帮助我们直接访问到history,而不再需要通过`props`访问
````
const Home = () => {
  const history = useHistory();
  let name = "tom";
  return (
    <div>
      <h1>home page</h1>
      <button onClick={() => history.push(`/hello/${name}`)}>Go to hello</button>
    </div>
  );
};
````
`useLocation`可以获取当前路由路径
````
const { pathname } = useLocation();
````
`useRouteMatch`返回当前匹配路由的信息如下
````
{"path":"/hello/:name","url":"/hello/tom","isExact":true,"params":{"name":"tom"}}
````
可以利用`useRouteMatch`进行路由嵌套
````
const Hello = () => {
  const { name } = useParams();
  const { pathname } = useLocation();
  const match = useRouteMatch();
  return (
    <div>
      {name !== "tom" ? <Redirect to="/" /> : null}
      <h1>hello, {name}</h1>
      <p>Current URL: {pathname}</p>
      <p>Current route: {JSON.stringify(match)}</p>
      <Link to={`${match.url}/goodbye`}>goodbye</Link>
      <Route path={`${match.url}/goodbye`} component={Goodbye} />
    </div>
  );
};
````
路由

函数，类，hook区别

组件数据传递