import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HeaderDropDown from "./HeaderDropDown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsonMenu from "./ElipsonMenu";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardSlice";

function Header({ boardOpen, setBoardOpen }) {

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const [isDeleteModelOpen, setisDeleteModelOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openEditBoard, setopenEditBoard] = useState(false);
  const [isElipsOpen, setIsElipsOpen] = useState(false);
  const [boardType, setboardType] = useState("add");

  const setopenEditModel = () => {
    setBoardOpen(true);
    setIsElipsOpen(true);
  };

  const setOpenDeleteModel = () => {
    setisDeleteModelOpen(true);
    setIsElipsOpen(false);
  };

  const onDeletedClick = () => {
  dispatch(boardsSlice.actions.deleteBoard())
  dispatch(boardsSlice.actions.setBoardActive({index:0}))
  setisDeleteModelOpen(false)

      
  }


  const onDropDownClick = () => {
    setDropDown(state => !state);
    setIsElipsOpen(false)
    setboardType('add')
  }

  return (
    <div className="bg-white left-0 fixed p-4 dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        <div>
          <h1 className="font-semibold text-4xl dark:text-white font-sans">
            MeroNote
          </h1>
        </div>
        <div className="flex items-center">
          <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
            {board.name}
          </h3>
          <span
            className="w-3 ml-2 md:hidden cursor-pointer"
            onClick={() => setDropDown((prevState) => !prevState)}
          >
            {dropDown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="btn hidden md:block ">Add a Task +</button>
          <button
            className="btn text-lg md:hidden"
            onClick={onDropDownClick}
            
          >
            +
          </button>
          <MoreVertIcon
            className="cursor-pointer h-6 "
            onClick={() => {
              setIsElipsOpen((state) => !state);
              setboardType("edit");
            }}
          />
        </div>
      </header>

      {dropDown && (
        <HeaderDropDown setBoardOpen={setBoardOpen} setDropDown={setDropDown} />
      )}
      {boardOpen && (
        <AddEditBoardModal setBoardOpen={setBoardOpen} type={boardType} />
      )}

      {openEditBoard && (
        <AddEditTaskModal
          setopenEditBoard={setopenEditBoard}
          openEditBoard={openEditBoard}
          device={"mobile"}
          type={boardType}
        />
      )}

      {isElipsOpen && (
        <ElipsonMenu
          isElipsOpen={isElipsOpen}
          setIsElipsOpen={setIsElipsOpen}
          type="Boards"
          setopenEditModel={setopenEditModel}
          setOpenDeleteModel={setOpenDeleteModel}
        />
      )}
      {
        isDeleteModelOpen && <DeleteModal 
        setisDeleteModelOpen  = {setisDeleteModelOpen} 
        type={'board'}
        title={board.name}
        onDeletedClick = {onDeletedClick}
         />
      }
    </div>
  );
}

export default Header;
