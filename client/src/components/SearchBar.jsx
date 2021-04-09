import "./SearchBar.css";

export const SearchBar = ({search, handleSearch, clear}) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />
      <span className="clear" onClick={clear}>
        &#x2715;
      </span>
    </div>
  );
};
