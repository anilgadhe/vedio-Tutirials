import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    vedios : [],
    vediosCount : 0,
}

const vedioSlice = createSlice({
    name :"vedio",
    initialState,
    reducers:{
       addToWatchLater :(state , action)=>{
         state.vedios.push(action.payload);
         state.vediosCount = state.vedios.length;       
      }
    }
})


export const {addToWatchLater} = vedioSlice.actions;

export default vedioSlice.reducer;