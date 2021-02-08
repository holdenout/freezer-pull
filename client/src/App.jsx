import {Switch, Route, Link} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.jsx";
import CarryOverPage from "./components/pages/CarryOverPage.jsx";
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
          <LandingPage
            toCarryOver={<Link to="/carryover">To Carryover</Link>}
          />
        </Route>
        <Route path="/carryover">
          <CarryOverPage />
        </Route>
        <Route path="/pull">
          <PullPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
