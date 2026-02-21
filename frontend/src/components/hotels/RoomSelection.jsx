import { useState } from "react";

const RoomSelection = ({ rooms }) => {
  const [selected, setSelected] = useState(null);
  const [nights, setNights] = useState(1);

  const calculateTotal = () => {
    if (!selected) return 0;
    return selected.price_per_night * nights;
  };

  return (
    <div>
      <h3>Select Room</h3>

      {rooms.map((room) => (
        <div key={room.id} className="room-card">
          <h4>{room.room_type}</h4>
          <p>Capacity: {room.capacity}</p>
          <p>Price/Night: ${room.price_per_night}</p>
          <button onClick={() => setSelected(room)}>Select</button>
        </div>
      ))}

      {selected && (
        <div>
          <input
            type="number"
            value={nights}
            min="1"
            onChange={(e) => setNights(e.target.value)}
          />
          <h4>Total Price: ${calculateTotal()}</h4>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;