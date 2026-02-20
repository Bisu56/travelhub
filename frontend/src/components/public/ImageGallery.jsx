import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-96 bg-cyan-100 rounded-xl flex items-center justify-center">
        <span className="text-cyan-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-cyan-100">
      <img
        src={images[selected]}
        alt="Selected"
        className="w-full h-[500px] object-cover"
      />
      {images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto bg-cyan-50">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              onClick={() => setSelected(idx)}
              className={`h-20 w-24 object-cover rounded-lg cursor-pointer transition-all ${
                idx === selected 
                  ? "ring-4 ring-lime-500 scale-105" 
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
