import React, { useState } from "react";
import { useSelector } from "react-redux";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Switch from "@mui/material/Switch";
import useDarkMode from "../hooks/UseDarkMode";

function HeaderDropDown({ setDropDown , setBoardOpen }) {
  const boards = useSelector((state) => state.boards);

  const [colorThem, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorThem === "light");

  const toggleDarkModeHandler = () => {
    setTheme(colorThem === "light" ? "dark" : "light");
    setDarkSide(!darkSide);
  };

  const createBoardHanlder = () => {
    setBoardOpen(true)
    setDropDown(false)


  }

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => {
        if (e.target != e.currentTarget) {
          return;
        }
        setDropDown(false);
      }}
    >
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          All Boards ({boards.length})
        </h3>

        <div className="">
          {boards.map((ele, index) => {
            return (
              <div
                className={`flex items-center space-x-2 px-5 py-4 ${
                  ele.isActive
                    ? "bg-[#635fc7] rounded-r-full text-white mr-8"
                    : ""
                }`}
                key={index}
              >
                <AcUnitIcon className="h-4 w-4" />
                <p className="text-lg dark:text-white font-bold cursor-pointer">{ele.name}</p>
              </div>
            );
          })}

          <div className="flex items-center space-x-2 text-[#635fc7] px-5 py-4">
            <AcUnitIcon className="h-4 w-4" />
            <p className="text-lg font-bold cursor-pointer" 
            onClick={createBoardHanlder}
            >
              Create A New Board
            </p>
          </div>

          <div className="mx-2 p-4 space-x-2 bg-slate-200 dark:bg-[#20212c] flex justify-center items-center rounded-lg ">
            <DarkModeIcon />
            <Switch
              checked={darkSide}
              onChange={toggleDarkModeHandler}
              className={`${
                darkSide ? "" : "bg-gray-200"
              } inline-block h-4 w-11 items-center rounded-md`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform  bg-white transition `}
              ></span>
            </Switch>
            <WbSunnyIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
