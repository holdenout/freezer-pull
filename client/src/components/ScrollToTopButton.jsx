import {useState, useEffect} from "react";
import "./ScrollToTopButton.css";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState();

  const handleClick = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  return (
    <div className="scroll-button" onClick={handleClick}>
      <div className="triangle-up"/>
    </div>
  );
};
