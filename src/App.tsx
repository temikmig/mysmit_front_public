import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@app/providers";
import { router } from "@app/router";
import { store } from "@app/store";

import "./index.css";

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider>
          <RouterProvider router={router}></RouterProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};
