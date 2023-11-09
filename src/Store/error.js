import { createSlice } from "@reduxjs/toolkit";

const initialErrorState = {
  errorMessage: "",
  showMessage: false,
  severity: "error",
};

const errorSlice = createSlice({
  name: "errors",
  initialState: initialErrorState,
  reducers: {
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    showMessage(state) {
      state.showMessage = true;
    },
    hideMessage(state) {
      state.showMessage = false;
    },
    setSeverity(state, action) {
      state.severity = action.payload;
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
