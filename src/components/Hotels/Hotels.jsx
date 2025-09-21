import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data } = useFetch(
    "http://localhost:5008/hotels",
    `host_location_like=${destination || ""}&name_like=${
      destination || ""
    }&accommodates_gte=${room || 1}`
  );
  if (isLoading) return <Loader />;
  return <div>{data.length}</div>;
}

export default Hotels;
