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
  const [isLoading, setIsLoading] = useState(false);

  const checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("No signed in user");
      return;
    }

    const token = user.accessToken;
    api.verifyLogin(token).then((res) => {
      if (res.status === 200) setIsLoggedIn(true);
    });
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // Populate food store from db (needs local fallback as failsafe)
    if (isLoggedIn) populateFoodStore().then(() => setIsLoading(false));
    else setIsLoading(false);
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
                <Redirect to={location.state.referrer} />
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
