import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-96 bg-cyan-100 rounded-2xl flex items-center justify-center">
        <span className="text-cyan-400 text-lg">No images available</span>
      </div>
    );
  }

  const goToPrevious = () => {
    setSelected(selected === 0 ? images.length - 1 : selected - 1);
  };

  const goToNext = () => {
    setSelected(selected === images.length - 1 ? 0 : selected + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cyan-100">
      <div className="relative h-[400px] lg:h-[500px]">
        <img
          src={images[selected]}
          alt="Selected"
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <FiChevronLeft className="text-cyan-900" size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <FiChevronRight className="text-cyan-900" size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-1.5 rounded-full text-sm">
          {selected + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 p-4 overflow-x-auto bg-cyan-50">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`flex-shrink-0 transition-all duration-200 ${
                idx === selected 
                  ? "ring-4 ring-lime-500 ring-offset-2 ring-offset-cyan-50 scale-105" 
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="h-20 w-28 object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
