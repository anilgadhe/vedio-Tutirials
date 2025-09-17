
import { configureStore } from "@reduxjs/toolkit";
import vedioSlice  from "../slicers/slicer"

export default configureStore({
reducer: {
    storeWatchedvedio: vedioSlice
  }
})