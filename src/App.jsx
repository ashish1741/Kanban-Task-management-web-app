import { useState } from "react";
import Center from "./components/Center";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "./redux/boardSlice";
import EmptyBoard from "./components/EmptyBoard";

export default function App() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const activateBoard = boards.find((boards) => boards.isActive);

  if (!activateBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
  }

  const [boardOpen, setBoardOpen] = useState(false);

  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      {
        boards.length > 0 ? 
        <>
      <Header boardOpen={boardOpen} setBoardOpen={setBoardOpen} />

      <Center boardOpen={boardOpen} setBoardOpen={setBoardOpen} />


        </> 
        : 
        <>
        <EmptyBoard type = 'add' />
        </>
      }  
    

    </div>
  );
}
