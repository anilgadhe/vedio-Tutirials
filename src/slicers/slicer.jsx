import { createSlice } from "@reduxjs/toolkit"


const initialState = {

  vedios: [],
  vediosCount: 0,
  likedVideos: [],
  dislikes: [],

}

const vedioSlice = createSlice({
  name: "vedio",
  initialState,
  reducers: {
    addToWatchLater: (state, action) => {
      state.vedios.push(action.payload);
      state.vediosCount = state.vedios.length;
    },
    removeFromWatchLater: (state, action) => {
      state.vedios = state.vedios.filter(v => v.id !== action.payload);
      state.vediosCount = state.vedios.length;

    },
    likeVideo: (state, action) => {
      if (!state.likedVideos.includes(action.payload)) {
        state.likedVideos.push(action.payload);
      }

    },
    dislikeVedio:(state,action)=>{
      if(!state.dislikes.includes(action.payload)){
        state.dislikes.push(action.payload);
      }
    }
  }
})


export const { addToWatchLater, removeFromWatchLater ,likeVideo,dislikeVedio} = vedioSlice.actions;

export default vedioSlice.reducer;