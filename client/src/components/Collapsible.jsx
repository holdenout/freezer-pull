import "./Collapsible.css";

export const Collapsible = ({open, header, content, toggleOpen}) => {
  return (
    <div className="collapsible">
      <button
        className="btn collapsible-header big-header"
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
