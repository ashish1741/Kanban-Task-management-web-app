import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HeaderDropDown from "./HeaderDropDown";

function Header() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="bg-white left-0 fixed p-4 dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        <div>
          <h1 className="font-semibold text-4xl dark:text-white font-sans">MeroNote</h1>
        </div>
        <div className="flex items-center">
          <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">board name</h3>
          <span className="w-3 ml-2 md:hidden cursor-pointer" onClick={() => setDropDown(prevState => !prevState)}>
            {dropDown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="btn hidden md:block ">Add a Task +</button>
          <button className="btn text-lg md:hidden">+</button>
          <MoreVertIcon className="cursor-pointer h-6 " />
        </div>
      </header>

      {dropDown && < HeaderDropDown  setDropDown = {setDropDown} />}
    </div>
  );
}

export default Header;
