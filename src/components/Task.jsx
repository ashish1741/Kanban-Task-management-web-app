import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModel from "../modals/TaskModel";

function Task({ taskIndex, colIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const columns = board.columns;
  
  const col = columns.find((Col, i) => i === colIndex);

  const task = col.tasks.find((task, i) => i === taskIndex);

  const [isTaskModelOpen, setisTaskModelOpen] = useState(false);

  let completed = 0;
  let subTaks = task.subtasks;

  if (subTaks && subTaks.length !== undefined) { 
    subTaks.forEach((subTask) => {
      if (subTask.isCompleted) {
        completed++;
      }
    });
  }

  return (
    <div>
      <div
        onClick={() => {
          setisTaskModelOpen((state) => !state);
        }}
        className=" w-[280px] first:my-5 rounded-lg 
       bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a]
        py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white 
        dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className=" font-bold tracking-wide ">{task.title}</p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subTaks ? subTaks.length : 0} completed tasks
        </p>
      </div>
      {isTaskModelOpen && (
        <TaskModel
          setisTaskModelOpen={setisTaskModelOpen}
          colIndex={colIndex}
          taskIndex={taskIndex}
        />
      )}
    </div>
  );
}

export default Task;
