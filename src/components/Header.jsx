import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file (react-date-range)
import "react-date-range/dist/theme/default.css"; // theme css file (react-date-range)
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [destination, setDestination] = useState(
    searchParams.get("destination") ?? ""
  );

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const handleOptions = (key, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [key]: operation === "inc" ? options[key] + 1 : options[key] - 1,
      };
    });
  };

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const dateRef = useRef();
  useOutsideClick(dateRef, "dateDropdown", () => setIsDateOpen(false));

  const navigate = useNavigate();
  function handleSearch() {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination,
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  }

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            id="dateDropdown"
            className="dateDropdown"
            onClick={() => setIsDateOpen(true)}
          >
            {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}
          </div>
          {isDateOpen && (
            <div ref={dateRef} className="date">
              <DateRange
                ranges={date}
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
              />
            </div>
          )}

          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setIsOptionsOpen(true)}>
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {isOptionsOpen && (
            <GuestOptionsList
              options={options}
              handleOptions={handleOptions}
              setIsOptionsOpen={setIsOptionsOpen}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionsList({ options, handleOptions, setIsOptionsOpen }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setIsOptionsOpen(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOptions={handleOptions}
        type={"adult"}
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type={"children"}
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type={"room"}
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ type, options, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
