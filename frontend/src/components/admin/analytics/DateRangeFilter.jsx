import { useState } from "react";

const DateRangeFilter = ({ onFilter }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div>
      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      <button onClick={() => onFilter(from, to)}>Apply</button>
    </div>
  );
};

export default DateRangeFilter;
