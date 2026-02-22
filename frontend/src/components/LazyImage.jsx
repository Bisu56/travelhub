const LazyImage = ({ src, alt, className, ...props }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      loading="lazy"
      className={className}
      {...props}
    />
  );
};

export default LazyImage;
