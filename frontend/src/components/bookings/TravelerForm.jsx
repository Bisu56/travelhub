import { useState } from "react";

const TravelerForm = ({ setTravelers }) => {
  const [list, setList] = useState([{ name: "", age: "" }]);

  const handleChange = (i, e) => {
    const updated = [...list];
    updated[i][e.target.name] = e.target.value;
    setList(updated);
    setTravelers(updated);
  };

  const addTraveler = () => {
    setList([...list, { name: "", age: "" }]);
  };

  return (
    <div>
      <h3>Traveler Details</h3>

      {list.map((t, i) => (
        <div key={i}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={(e) => handleChange(i, e)}
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={(e) => handleChange(i, e)}
          />
        </div>
      ))}

      <button onClick={addTraveler}>Add Traveler</button>
    </div>
  );
};

export default TravelerForm;