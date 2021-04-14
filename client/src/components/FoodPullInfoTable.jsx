import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import api from "../adapters/pullAdapter.js";
import loader from "../assets/coffeeLoader.gif";

const TableRow = ({data}) => {
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
    <tr>
      <td>
        <pre>{`${dateStr}\n${timeStr}`}</pre>
      </td>
      <td>{data.user}</td>
      <td>{data.carryover}</td>
      <td>{data.pulled}</td>
      <td>{data.carryover + data.pulled}</td>
    </tr>
  );
};

export const FoodPullInfoTable = ({sku, setIsLoggedIn}) => {
  const [foodPullInfo, setFoodPullInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    api.foodPullInfo(sku, 5, (err, data) => {
      if (err) {
        console.log(err);

        if (isMounted) {
          setIsLoggedIn(false);
          history.push("/login", {referrer: "/pull"});
        }
      }

      if (isMounted) {
        setFoodPullInfo(data);
        setIsLoading(false);
      }
    });

    return () => (isMounted = false);
  }, [history, sku, setIsLoggedIn]);

  const rows = foodPullInfo.map((data) => (
    <TableRow key={data.pull_id} data={data} />
  ));

  return (
    <>
      {isLoading ? (
        <img className="loader" src={loader} alt="loading..." />
      ) : (
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
      )}
    </>
  );
};

export default FoodPullInfoTable;
