import React from "react";
import { useSelector } from "react-redux";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Switch from "@mui/material/Switch";


function HeaderDropDown({ setDropDown }) {
  const label = { cinputProps: { dark: "Light" } };
  const boards = useSelector((state) => state.boards);

  //   console.log(boards);

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
                <p className="text-lg font-bold cursor-pointer">{ele.name}</p>
              </div>
            );
          })}

          <div className="flex items-center space-x-2 text-[#635fc7] px-5 py-4">
            <AcUnitIcon className="h-4 w-4" />
            <p className="text-lg font-bold cursor-pointer">
              Create A New Board
            </p>
          </div>

          <div className="mx-2 p-4 space-x-2 bg-slate-200 dark:bg-[#20212c] flex justify-center items-center rounded-lg ">
            <WbSunnyIcon />
            <Switch {...label} />
            <DarkModeIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
