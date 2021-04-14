import {useState, useEffect} from "react";
import {Switch, Route, Redirect, useLocation} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CarryoverPage from "./pages/CarryoverPage.jsx";
import PullPage from "./pages/PullPage.jsx";
import NavBar from "./components/NavBar.jsx";
import {populateFoodStore} from "./util/populateFoodStore.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import api from "./adapters/authAdapter.js";
import loader from "./assets/coffeeLoader.gif";
import "./styles.css";

const PageRoutes = ({setIsLoggedIn}) => {
  return (
    <>
      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route path="/carryover">
        <CarryoverPage />
      </Route>

      <Route path="/pull">
        <PullPage setIsLoggedIn={setIsLoggedIn} />
      </Route>
    </>
  );
};

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {pathname} = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    api.verifyLogin((err, verified) => {
      if (verified) setIsLoggedIn(true);

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);

      populateFoodStore().then(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <ScrollToTop />

      {isLoading ? (
        <img className="loader" src={loader} alt="loading..." />
      ) : (
        <Switch>
          <Route
            path="/login"
            render={({location}) =>
              isLoggedIn ? (
                <Redirect to={location.state ? location.state.referrer : "/"} />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />

          {isLoggedIn ? (
            <PageRoutes setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Redirect to={{pathname: "/login", state: {referrer: pathname}}} />
          )}
        </Switch>
      )}
    </div>
  );
};

export default App;
