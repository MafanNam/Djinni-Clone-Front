import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  room_id: '',
}

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.room_id = action.payload;
    },
  },
});

export const {setRoomId} = inboxSlice.actions;
export default inboxSlice.reducer;