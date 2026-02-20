const ItineraryAccordion = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return <p className="text-cyan-500">No itinerary available</p>;
  }

  return (
    <div className="space-y-3">
      {itinerary.map((day, idx) => (
        <details key={idx} className="group bg-white rounded-xl shadow-md overflow-hidden border border-cyan-100">
          <summary className="cursor-pointer font-bold p-4 bg-cyan-50 hover:bg-cyan-100 transition-colors flex justify-between items-center">
            <span className="text-cyan-900">
              Day {day.day_number}: {day.title}
            </span>
            <span className="text-lime-600 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="p-4 border-t border-cyan-100">
            <p className="text-cyan-700 leading-relaxed">{day.description}</p>
          </div>
        </details>
      ))}
    </div>
  );
};

export default ItineraryAccordion;
