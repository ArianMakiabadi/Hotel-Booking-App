import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useHotels } from "../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Found {hotels.length} hotels:</h2>
      {hotels.map((item) => {
        const isCurrent = item.id === currentHotel?.id;
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className={`searchItem ${isCurrent ? "current-hotel" : ""}`}>
              {isCurrent ? <span className="current-badge">Current</span> : null}
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
