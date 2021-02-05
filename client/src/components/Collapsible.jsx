import './Collapsible.css';

export default function Collapsible({open, header, content, toggleOpen}) {
  return (
    <div className="collapsible">
      <button className="collapsible-header" onClick={toggleOpen}>
        {header}
      </button>
      {open && <div className="collapsible-content">{content}</div>}
    </div>
  );
}
