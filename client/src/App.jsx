import {useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.jsx";
import CarryoverPage from "./components/pages/CarryoverPage.jsx";
import PullPage from "./components/pages/PullPage.jsx";
import NavBar from "./components/NavBar.jsx";
import {populateFoodStore} from "./util/populateFoodStore.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./styles.css";

export const App = () => {
  // Populate food store from db
  //   (needs local fallback as failsafe)
  useEffect(() => populateFoodStore(), []);

  return (
    <div className="App">
      <NavBar />
      <ScrollToTop />

      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route path="/carryover">
          <CarryoverPage />
        </Route>

        <Route path="/pull">
          <PullPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
