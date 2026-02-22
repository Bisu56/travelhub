const Loader = ({ size = "medium", fullPage = false }) => {
  const sizeStyles = {
    small: "20px",
    medium: "40px",
    large: "60px"
  };

  const spinnerSize = sizeStyles[size] || sizeStyles.medium;

  const containerStyle = fullPage ? {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999
  } : {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px"
  };

  return (
    <div style={containerStyle}>
      <div 
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #0ea5e9",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
