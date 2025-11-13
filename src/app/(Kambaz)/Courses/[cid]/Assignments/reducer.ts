import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }) => {
      state.assignments = payload;
    },
    addAssignment: (state, { payload }) => {
      const newAssignment = {
        _id: uuidv4(),
        ...payload,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === payload._id ? payload : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment,setAssignments } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;