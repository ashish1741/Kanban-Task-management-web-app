import { useSelect } from "@mui/base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ElipsonMenu from "../components/ElipsonMenu";

function TaskModel({ setisTaskModelOpen, colIndex, taskIndex }) {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  console.log(boards);

  const board = boards.find((board) => board.isActive);

  const columns = board.columns;

  const col = columns.find((col, i) => i === colIndex);

  const task = col.tasks.find((task, i) => i === taskIndex);




  const subtasks = task.subtasks;
  let completed = 0;

  if (subtasks && subtasks.length !== undefined) {
    subtasks.forEach((subTask) => {
      if (subtasks.isCompleted) {
        completed++;
      }
    });
  }

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [status, setstatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));

  const setopenEditModel = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className=" fixed bg-transparent right-0 top-0 px-2 py-4 
     overflow-scroll scrollbar-hide  z-50000 left-0 bottom-0 
     justify-center items-center flex dropdown "
      onClick={() => {
        // setisTaskModelOpen(false);
      }}
    >
      {/* MODAL SECTION */}

      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto 
       bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
        shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex   justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>

          <MoreVertIcon
            className=" cursor-pointer h-6"
            onClick={() => {
              setIsElipsisMenuOpen(true);
            }}
          />

          {isElipsisMenuOpen && (
            <ElipsonMenu
              setopenEditModel={setopenEditModel}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>

       

        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>
      </div>
    </div>
  );
}

export default TaskModel;
