import React, { useContext, useState } from 'react'
import {FaBed, FaCar, FaTaxi, FaPlane, FaCalendar} from 'react-icons/fa';
import {BsFillPersonFill} from "react-icons/bs";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns";
import { DateRange } from "react-date-range";
import Option from "./Header/Option"
import {useNavigate} from "react-router-dom";
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';

const Header = ({type}) => {
    const {user} = useContext(AuthContext)
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        }
    ])
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    const navigate = useNavigate();
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            };
        });
    };

    const {dispatch} = useContext(SearchContext);

    const handleSearch = () => {
      dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
      navigate("/hotels", {state: { destination, dates, options }});
    }
  return ( 
    <div className='bg-primary text-white flex justify-center relative'>
        <div className={`w-full max-w-5xl m-x-0 mt-5 ${type !== "list" && 'mb-[100px]'}`}>
            <div className='flex gap-10 mb-[50px]'>
                <div className='header-list-item activated'>
                    <FaBed className='inline-block'/>
                    <span>Stays</span>
                </div>
                <div className='header-list-item'>
                    <FaPlane className='inline-block'/>
                    <span>Flights</span>
                </div>
                <div className='header-list-item'>
                    <FaCar className='inline-block'/>
                    <span>Car Rentals</span>
                </div>
                <div className='header-list-item'>
                    <FaBed className='inline-block'/>
                    <span>Attractions</span>
                </div>
                <div className='header-list-item'>
                    <FaTaxi className='inline-block'/>
                    <span>Airport Taxis</span>
                </div>
            </div>
            {type !== "list" && (
          <>
            <h1 className="text-4xl font-bold">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="my-5">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            {!user && <button className="bg-[#0071c2] text-white font-medium border-none p-2.5 cursor-pointer">Sign in / Register</button>}
            <div className="h-[30px] bg-white border-solid border-[2px] border-[#febb02] flex items-center justify-around py-10 rounded-[5px] absolute bottom-[-25px] w-full max-w-5xl">
              <div className="flex items-center gap-2.5">
                <FaBed className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-none outline-none text-gray-800"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <FaCalendar className="text-gray-400" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="text-gray-400 cursor-pointer"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="absolute top-[50px] z-10 shadow-md"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <BsFillPersonFill className="text-gray-400" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="text-gray-400 curosr-pointer capitalize"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="z-10 absolute top-[50px] bg-white text-gray-500 rounded-md shadow-md">
                    <Option type="adult" options={options} handleOption={handleOption}/>
                    <Option type="children" options={options} handleOption={handleOption}/>
                    <Option type="room" options={options} handleOption={handleOption}/>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <button className="bg-[#0071c2] text-white font-medium border-none p-2.5 cursor-pointer" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
        </div>
    </div>
  )
}

export default Header