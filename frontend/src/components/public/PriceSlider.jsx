const PriceSlider = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="10000"
      step="100"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  );
};

export default PriceSlider;
