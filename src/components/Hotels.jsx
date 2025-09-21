import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useHotels } from "../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels } = useHotels();
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Found {hotels.length} hotels:</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lang=${item.longitude}`}
          >
            <div className="searchItem">
              <img src={item.xl_picture_url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">€&nbsp;{item.price}&nbsp;/&nbsp;night</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
