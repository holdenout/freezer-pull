import "./App.css";
import NavBar from "./components/NavBar.jsx";
import FoodList from "./components/FoodList.jsx";

export const App = () => {
  return (
    <div className="App">
      <NavBar />
      <FoodList />
    </div>
  );
};

export default App;
