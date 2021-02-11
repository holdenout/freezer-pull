import {Switch, Route} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.jsx";
import CarryoverPage from "./components/pages/CarryoverPage.jsx";
import PullPage from "./components/pages/PullPage.jsx";
import NavBar from "./components/NavBar.jsx";
import {getFoodData} from "./utilities/getFoodData.js";
import "./App.css";

export const App = () => {
  getFoodData();

  return (
    <div className="App">
      <NavBar />

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
