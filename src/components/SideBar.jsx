import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../hooks/UseDarkMode";
import boardsSlice from "../redux/boardSlice";
import Switch from "@mui/material/Switch";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function SideBar({ isSideBarOpen, setIsSideBarOpen }) {
  const disPatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const [colorThem, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorThem === "light");
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const toggleDarkModeHandler = () => {
    setTheme(colorThem === "light" ? "dark" : "light");
    setDarkSide(!darkSide);
  };

  const createBoardHanlder = () => {
    setIsBoardModalOpen(true)
 

  }

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
            : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div className="">
          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-[#2b2c37]    w-full   py-4 rounded-xl">
              <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="  dropdown-borad flex flex-col h-[70vh]  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-center  space-x-2   px-5 mr-8 rounded-r-full
                       duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7]
                        dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  ${
                          board.isActive &&
                          " bg-[#635fc7] rounded-r-full text-white mr-8 "
                        } `}
                      key={index}
                      onClick={() => {
                        disPatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <AcUnitIcon className="   filter-white  h-4 " />
                      <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=" flex  items-center space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white  "
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <AcUnitIcon className="   filter-white  h-4 " />
                    <p className=" text-lg font-bold  "  onClick={createBoardHanlder}> Create New Board </p>
                  </div>
                </div>

                <div className="mx-2 p-4 space-x-2 bg-slate-200 dark:bg-[#3e3e5d] flex justify-center items-center rounded-lg ">
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
          )}
        </div>
      </div>
      {
        isBoardModalOpen && 
        <AddEditBoardModal type={'add'} setBoardOpen={setIsBoardModalOpen} />
      }
    </div>
  );
}

export default SideBar;
