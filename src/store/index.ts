import { configureStore } from "@reduxjs/toolkit";
import { authReducer, uiReducer } from "./slices";
import {
  authApi,
  usersApi,
  productsApi,
  stockMovementsApi,
  suppliersApi,
  unitsApi,
  servicesApi,
  purchaseApi,
  writeOffApi,
  checklistsApi,
  clientsApi,
  employeesApi,
  financesApi,
  businessExpensesApi,
  inventoryApi,
  clientSourcesApi,
  businessPercentagesApi,
  plansApi,
} from "../api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,

    [suppliersApi.reducerPath]: suppliersApi.reducer,
    [unitsApi.reducerPath]: unitsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,

    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [writeOffApi.reducerPath]: writeOffApi.reducer,
    [checklistsApi.reducerPath]: checklistsApi.reducer,
    [stockMovementsApi.reducerPath]: stockMovementsApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [financesApi.reducerPath]: financesApi.reducer,
    [businessExpensesApi.reducerPath]: businessExpensesApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [clientSourcesApi.reducerPath]: clientSourcesApi.reducer,
    [businessPercentagesApi.reducerPath]: businessPercentagesApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      usersApi.middleware,
      productsApi.middleware,
      stockMovementsApi.middleware,
      suppliersApi.middleware,
      unitsApi.middleware,
      servicesApi.middleware,
      purchaseApi.middleware,
      writeOffApi.middleware,
      checklistsApi.middleware,
      clientsApi.middleware,
      employeesApi.middleware,
      financesApi.middleware,
      businessExpensesApi.middleware,
      inventoryApi.middleware,
      clientSourcesApi.middleware,
      businessPercentagesApi.middleware,
      plansApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
