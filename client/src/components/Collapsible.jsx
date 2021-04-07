import {useRef, useEffect} from "react";
import "./Collapsible.css";

export const Collapsible = ({
  open,
  header,
  fadeHeader,
  content,
  toggleOpen,
}) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (open) itemRef.current.scrollIntoView();
  }, [open]);

  return (
    <div className="collapsible" ref={itemRef}>
      <button
        className={`btn collapsible-header big-header ${
          fadeHeader ? "fade" : ""
        }`}
        onClick={toggleOpen}
      >
        {header}
      </button>
      {open && <div className="collapsible-content">{content}</div>}
    </div>
  );
};

export const SmallCollapsible = ({open, children, toggleOpen}) => {
  return (
    <div className="collapsible">
      <button
        className="btn collapsible-header small-header"
        onClick={toggleOpen}
      >
        <div className="arrow">{open ? "\uFF0D" : "\uFF0B"}</div>
        &nbsp;Previous Pull Info
      </button>
      {open && <div className="collapsible-content">{children}</div>}
    </div>
  );
};
