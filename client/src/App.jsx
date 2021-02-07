import "./App.css";
import LandingPage from "./components/pages/LandingPage.jsx";
import CarryOverPage from "./components/pages/CarryOverPage.jsx";
import PullPage from "./components/pages/PullPage.jsx";
import NavBar from "./components/NavBar.jsx";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
      </div>

      <Switch>
        <Route exact path="/">
          <LandingPage toCarryOver={
            <Link to="/carryover">To Carryover</Link>
          } />
        </Route>
        <Route path="/carryover">
          <CarryOverPage />
        </Route>
        <Route path="/pull">
          <PullPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
