import React from "react";
import { BrowserRouter, Route, NavLink, Link, Redirect, Switch, useHistory, useParams, useLocation, useRouteMatch } from "react-router-dom";
import { Grandparent } from "./pages/context";
import { UnlimitedList } from './pages/unlimitedList.jsx'
import "./App.css";

function App() {
    const name = "hayden";
    const isAdmin = true;
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
                        <Link to={`/hello/${name}`}>hello（Link）</Link>
                    </li>
                    <li>
                        <Link to="/welcome">welcome</Link>
                    </li>
                    <li>
                        <Link to="/unlimitedList">unlimitedList</Link>
                    </li>
                    <li>
                        <NavLink to="/welcome" activeClassName="light">
                            welcome（NacLink）
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/hello/:name" component={Hello} />
                <Route path="/unlimitedList" component={UnlimitedList} />
                {isAdmin ? <Route path="/welcome" render={() => <h1>Welcome!</h1>} /> : null}
                {/*404 page*/}
                <Route render={() => <h1>404: page not found</h1>} />
            </Switch>
        </BrowserRouter>
    );
}

const Home = () => {
    const history = useHistory();
    let name = "tom";
    return (
        <div>
            <h1>home page</h1>
            <button onClick={() => history.push(`/hello/${name}`)}>Go to hello</button>
            <Grandparent></Grandparent>
        </div>
    );
};

// const Home = ({ history }) => {
//   let name = "tom";
//   return (
//     <div>
//       <h1>home page</h1>
//       <button onClick={() => history.push(`/hello/${name}`)}>Go to hello</button>
//     </div>
//   );
// };

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

// const hello = ({
//   match: {
//     params: { name },
//   },
// }) => {
//   return (
//     <div>
//       {name !== "tom" ? <Redirect to="/" /> : null}
//       <h1>hello, {name}</h1>
//     </div>
//   );
// };

const Goodbye = () => {
    return (
        <div>
            <h1>goodbye</h1>
        </div>
    );
};

export default App;
