import { RouterProvider } from "react-router-dom";
import { router } from "./routing";
import { Provider } from "react-redux";
import { store } from "./store";
import { DevelopTag } from "./components/DevelopTag";

function App() {
  return (
    <Provider store={store}>
      <DevelopTag />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
