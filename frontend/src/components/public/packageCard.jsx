import { useNavigate } from "react-router-dom";

const PackageCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow rounded cursor-pointer"
      onClick={() => navigate(`/packages/${data.id}`)}
    >
      <img
        src={data.images?.[0]}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{data.title}</h3>
        <p>${data.price}</p>
      </div>
    </div>
  );
};

export default PackageCard;
