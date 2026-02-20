const ItineraryAccordion = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-cyan-500">No itinerary available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {itinerary.map((day, idx) => (
        <details 
          key={idx} 
          className="group bg-cyan-50 rounded-xl overflow-hidden border border-cyan-200"
        >
          <summary className="cursor-pointer font-bold p-4 md:p-5 flex items-center justify-between hover:bg-cyan-100 transition-colors list-none">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 bg-lime-500 text-cyan-900 rounded-lg flex items-center justify-center font-bold text-sm">
                {day.day_number || idx + 1}
              </span>
              <span className="text-cyan-900 text-base md:text-lg">
                {day.title}
              </span>
            </div>
            <span className="text-lime-600 group-open:rotate-180 transition-transform duration-300">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <div className="px-4 md:px-5 pb-5 pt-0 border-t border-cyan-200/50">
            <p className="text-cyan-700 leading-relaxed pt-4">{day.description}</p>
          </div>
        </details>
      ))}
    </div>
  );
};

export default ItineraryAccordion;
