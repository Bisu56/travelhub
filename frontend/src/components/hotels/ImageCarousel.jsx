import { useState } from "react";

const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <img src={images[index]} alt="hotel" width="400" />
      <button onClick={() => setIndex((index - 1 + images.length) % images.length)}>Prev</button>
      <button onClick={() => setIndex((index + 1) % images.length)}>Next</button>
    </div>
  );
};

export default ImageCarousel;