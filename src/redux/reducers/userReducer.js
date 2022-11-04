import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  trialusers: null,
  codes: null,
  allCodes: null,
  allDurations: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state, { payload }) => {
      state.users = payload;
    },
    getUserTrial: (state, { payload }) => {
      state.trialusers = payload;
    },
    getCodes: (state, { payload }) => {
      state.codes = payload;
    },
    getAllCodes: (state, { payload }) => {
      state.allCodes = payload;
    },
    getAllDuration: (state, { payload }) => {
      state.allDurations = payload;
    },
  },
  //   extraReducers: {
  //     [fetchUsers]: (state, action) => {
  //       console.log(state, action);
  //     },
  //   },
});

export const { getUsers, getUserTrial, getCodes, getAllCodes, getAllDuration } =
  userSlice.actions;

export default userSlice.reducer;
