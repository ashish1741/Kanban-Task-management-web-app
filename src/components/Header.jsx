import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function Header() {
  const [dropDown, setdropDown] = useState(true);

  return (
    <div className="bg-white left-0 fixed p-4 dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex  justify-between dark:text-white items-center ">
        <div className="">
          <h1 className="font-semibold text-4xl dark:text-white font-sans  ">
            MeroNote
          </h1>
        </div>
        <div>
          <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
            board name
          </h3>
          {dropDown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        </div>
      </header>
    </div>
  );
}

export default Header;
