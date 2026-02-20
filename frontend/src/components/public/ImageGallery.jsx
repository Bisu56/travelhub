import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return <div className="h-96 bg-gray-200 rounded"></div>;
  }

  return (
    <div>
      <img
        src={images[selected]}
        alt="Selected"
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            onClick={() => setSelected(idx)}
            className={`h-20 w-24 object-cover rounded cursor-pointer ${
              idx === selected ? "ring-2 ring-blue-500" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
