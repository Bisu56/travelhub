const ItineraryAccordion = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return <p className="text-gray-500">No itinerary available</p>;
  }

  return (
    <div>
      {itinerary.map(day => (
        <details key={day.day_number} className="mb-2">
          <summary className="cursor-pointer font-bold p-3 bg-gray-100 rounded">
            Day {day.day_number}: {day.title}
          </summary>
          <p className="p-3">{day.description}</p>
        </details>
      ))}
    </div>
  );
};

export default ItineraryAccordion;
