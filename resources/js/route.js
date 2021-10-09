import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import OfficialAccountManage from "./pages/OfficialAccountManage";
import UserList from "./pages/UserList";
import Chat from "./pages/Chat";
import NotFound from "./pages/Chat";

function App() {
    return (
        <div>
            <Switch>
                <Route path="/home" exact>
                    <Dashboard />
                </Route>
                <Route path="/official_account_manage" exact>
                    <OfficialAccountManage />
                </Route>
                <Route path="/user_list" exact>
                    <UserList />
                </Route>
                <Route path="/chat" exact>
                    <Chat />
                </Route>
                <Route path="*">
                    <Redirect to="/home" />
                </Route>
            </Switch>
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("example")
);
