import {useState, useEffect} from "react";
import "./ScrollToTopButton.css";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState();

  return (
    <div className="scroll-button">
      <div className="triangle-up">a</div>
    </div>
  );
};
