import { configureStore } from "@reduxjs/toolkit";
import boradSlice from "../redux/boardSlice"



// creating store 

const store = configureStore({
    reducer: {
        boards: boradSlice.reducer




    }

})

export default store