import {useEffect, useRef} from "react";

export const NumberInput = ({
  value,
  onClickIncr,
  onClickDecr,
  onChange,
  setFocus,
}) => {
  const focusRef = useRef(null);
  useEffect(() => {
    if (setFocus) focusRef.current.focus();
  }, [setFocus]);

  return (
    <>
      <button className="btn incr-decr-btn" onClick={onClickDecr}>
        {/* fullwidth hyphen-minus unicode character */}
        &#xFF0D;
      </button>
      <input
        className="food-input"
        type="tel"
        value={value}
        onChange={onChange}
        ref={focusRef}
      />
      <button className="btn incr-decr-btn" onClick={onClickIncr}>
        {/* fullwidth plus sign unicode character */}
        &#xFF0B;
      </button>
    </>
  );
};
