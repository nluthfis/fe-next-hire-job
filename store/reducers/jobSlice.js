import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  job: null,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    storeJob: (state, action) => {
      state.job = action.payload;
    },
  },
});

export const { storeJob } = jobSlice.actions;
export default jobSlice.reducer;
