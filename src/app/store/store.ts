import { configureStore } from "@reduxjs/toolkit";

import { uiReducer } from "@entities/ui";
import { userReducer } from "@entities/user";
import { authReducer } from "@features/auth";
import { baseApi } from "@shared/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    ui: uiReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([baseApi.middleware]),
});
