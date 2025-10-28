import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface UIState {
  headerTitle: string;
}

const initialState: UIState = { headerTitle: "Дашборд" };

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHeaderTitle: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload;
    },
  },
});
export const getHeaderTitle = (state: RootState) => state.ui.headerTitle;

export const { setHeaderTitle } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
