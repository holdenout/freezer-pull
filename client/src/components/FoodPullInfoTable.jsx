import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import api from "../adapters/pullAdapter.js";

export const FoodPullInfoTable = ({sku, setIsLoggedIn}) => {
  const [foodPullInfo, setFoodPullInfo] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("No signed in user");
      setIsLoggedIn(false);
      history.push("/login", {referrer: "/pull"});
      return;
    }

    const token = user.accessToken;
    api.foodPullInfo(sku, 5, token).then(
      ({data}) => {
        setFoodPullInfo(data);
      },
      (err) => {
        console.log(err);
        setIsLoggedIn(false);
        history.push("/login", {referrer: "/pull"});
      }
    );
  }, [history, sku, setIsLoggedIn]);

  const rows = foodPullInfo.map((data) => {
    const dateObj = new Date(data.pull_date);
    const dateStr = dateObj.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
    });
    const timeStr = dateObj.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <tr key={data.pull_id}>
        <td>
          <pre>{`${dateStr}\n${timeStr}`}</pre>
        </td>
        <td>{data.user}</td>
        <td>{data.carryover}</td>
        <td>{data.pulled}</td>
        <td>{data.carryover + data.pulled}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>Carryover</th>
          <th>Pulled</th>
          <th>Final Par</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default FoodPullInfoTable;
