import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@app/store";

interface UIState {
  headerTitle: string;
  isSidebarOpen: boolean;
}

const initialState: UIState = { headerTitle: "Дашборд", isSidebarOpen: false };

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHeaderTitle: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});
export const getHeaderTitle = (state: RootState) => state.ui.headerTitle;
export const getSidebarOpen = (state: RootState) => state.ui.isSidebarOpen;

export const { setHeaderTitle, setSidebarOpen } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
