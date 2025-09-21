import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useHotels } from "../../context/HotelsProvider";
import { useState } from "react";

function Map() {
  const { hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([51, -3]);
  const position = [51.505, -0.09];
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
