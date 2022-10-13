import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  trialusers: null,
  codes: null,
  allCodes: null,
  durationCodes: null,
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
    durationCodesGenerated: (state, { payload }) => {
      state.durationCodes = payload;
    },
  },
  //   extraReducers: {
  //     [fetchUsers]: (state, action) => {
  //       console.log(state, action);
  //     },
  //   },
});

export const {
  getUsers,
  getUserTrial,
  getCodes,
  getAllCodes,
  durationCodesGenerated,
} = userSlice.actions;

export default userSlice.reducer;
