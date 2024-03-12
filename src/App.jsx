import { useState } from "react";
import Center from "./components/Center";
import Header from "./components/Header";

export default function App() {
 const [boardOpen, setBoardOpen] =  useState(false)

  return (
    <div className="">
      
      <Header boardOpen= {boardOpen} setBoardOpen = {setBoardOpen}  />
    </div>
  )
}