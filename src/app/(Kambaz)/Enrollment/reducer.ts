"use client";
import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";

const initialState = {
  enrollments: dbEnrollments,
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollUser: (state, action) => {
      const { userId, courseId } = action.payload;
      const exists = state.enrollments.find(
        (e) => e.user === userId && e.course === courseId
      );
      if (!exists) {
        state.enrollments.push({
          _id: `${userId}-${courseId}`,
          user: userId,
          course: courseId,
        });
      }
    },
    unenrollUser: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { toggleShowAllCourses, enrollUser, unenrollUser } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;