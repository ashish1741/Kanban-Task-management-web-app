import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ElipsonMenu from "../components/ElipsonMenu";
import SubTask from "../components/SubTask";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardSlice";
import AddEditTaskModal from "./AddEditTaskModal";

function TaskModel({ setisTaskModelOpen, colIndex, taskIndex }) {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

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

  const [isDeleteModelOpen, setisDeleteModelOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [status, setstatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));

  const setopenEditModel = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

   const setOpenDeleteModel = () => {
    setisDeleteModelOpen(true);
    setIsElipsOpen(false);
  };

  const onChange = (e) => {
    setstatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e) => {
    if (e.target != e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );

    setisTaskModelOpen(false);
  };

  const onDeletedClick = () => {
    dispatch(boardsSlice.actions.deleteTask({taskIndex , colIndex}))
    dispatch(boardsSlice.actions.setBoardActive({index:0}))
    setisDeleteModelOpen(false)
    setisTaskModelOpen(false) 
    }

    


  return (
    <div
      className=" fixed bg-transparent right-0 top-0 px-2 py-4 
     overflow-scroll scrollbar-hide  z-50000 left-0 bottom-0 
     justify-center items-center flex dropdown "
    >
      {/* MODAL SECTION */}

      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto 
       bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
        shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
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
              type="Task"
              setOpenDeleteModel={setOpenDeleteModel}
            />
          )}
        </div>

        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {
          // subtask section
        }

        <div className=" mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <SubTask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}
        </div>

        {/* Current Status Section */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option className="dark:bg-gray-600" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
        <button 
      onClick={onClose}
        className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full">
          Complete
        </button>
      </div>

      {isDeleteModelOpen && (
        <DeleteModal
         onDeletedClick = {onDeletedClick}
         setOpenDeleteModel={setisDeleteModelOpen}
         title = {task.title}
         type = "task"

          />
      )}

  
    </div>
  );
}

export default TaskModel;
