import {useState, useEffect} from "react";
import "./ScrollToTopButton.css";

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY === 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const handleClick = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    visible && (
      <div className="scroll-button" onClick={handleClick}>
        <div className="triangle-up" />
      </div>
    )
  );
};
