import React, { useEffect } from "react";

import "./App.css";

// eslint-disable-next-line
import { WidthCSS, HeightCSS, ColorCSS, IconCSS } from "./assetsPaths/css";
import {
  Main,
  Login,
  Document,
  Anggota,
  Profile,
  Event,
  Administrator,
  ViewAnggota,
  CreateAnggota,
  EventDetail,
  CreateEvent,
  CreateDokumen,
  ViewDokumen,
  ViewEvent,
  ChangePassword,
  ChangeUsername,
} from "./componentPaths";

//Redux
import { Provider, Store, loadUser, setAuthToken } from "./redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={Store}>
      <Router>
        <Switch>
          <>
            <div className="App">
              <div className="container-fluid p-0 m-0">
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/dokumen" component={Document} />
                <Route exact path="/anggota" component={Anggota} />
                <Route path="/anggota/:nim" component={Profile} />
                <Route exact path="/event" component={Event} />
                <Route path="/event/:nama_event" component={EventDetail} />
                <Route path="/admin/dashboard" component={Administrator} />
                <Route path="/admin/view/anggota" component={ViewAnggota} />
                <Route path="/admin/create/anggota" component={CreateAnggota} />
                <Route path="/admin/create/event" component={CreateEvent} />
                <Route path="/admin/create/dokumen" component={CreateDokumen} />
                <Route path="/admin/view/dokumen" component={ViewDokumen} />
                <Route path="/admin/view/event" component={ViewEvent} />
                <Route
                  path="/admin/data/change_password/:username"
                  component={ChangePassword}
                />
                <Route
                  path="/admin/data/change_username/:username"
                  component={ChangeUsername}
                />
              </div>
            </div>
          </>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
