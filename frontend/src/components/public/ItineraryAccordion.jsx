import { useState } from "react";

const ItineraryAccordion = ({ itinerary }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!itinerary || itinerary.length === 0) {
    return <p className="text-gray-500">No itinerary available</p>;
  }

  return (
    <div className="space-y-2">
      {itinerary.map((day, idx) => (
        <div key={idx} className="border rounded">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full text-left p-3 font-medium flex justify-between items-center"
          >
            <span>Day {day.day}</span>
            <span>{openIndex === idx ? "-" : "+"}</span>
          </button>
          {openIndex === idx && (
            <div className="p-3 border-t">
              <p className="font-semibold">{day.title}</p>
              <p className="text-gray-600 mt-1">{day.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItineraryAccordion;
