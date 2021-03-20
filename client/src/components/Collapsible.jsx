import "./Collapsible.css";

export const Collapsible = ({open, header, content, toggleOpen}) => {
  return (
    <div className="collapsible">
      <button className="btn collapsible-header" onClick={toggleOpen}>
        {header}
      </button>
      {open && <div className="collapsible-content">{content}</div>}
    </div>
  );
};

export default Collapsible;
