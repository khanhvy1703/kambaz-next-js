"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],        // ⬅️ No more local DB enrollment
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
  },
});

export const { setEnrollments, toggleShowAllCourses } =
  enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
