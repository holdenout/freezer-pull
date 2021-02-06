import "./App.css";
import NavBar from "./components/NavBar.jsx";
import FoodListContainer from "./components/FoodListContainer.jsx";

export const App = () => {
  return (
    <div className="App">
      <NavBar />
      <FoodListContainer />
    </div>
  );
};

export default App;
