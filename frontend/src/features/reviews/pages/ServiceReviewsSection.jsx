import { useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const ServiceReviewsSection = ({ serviceId, serviceType }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewSubmitted = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Customer Reviews</h2>
      
      <ReviewForm 
        serviceId={serviceId} 
        serviceType={serviceType}
        onReviewSubmitted={handleReviewSubmitted}
      />
      
      <div key={refreshKey}>
        <ReviewList serviceId={serviceId} serviceType={serviceType} />
      </div>
    </div>
  );
};

export default ServiceReviewsSection;
