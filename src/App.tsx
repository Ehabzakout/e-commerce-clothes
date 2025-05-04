import { AppRouter } from "./routes/AppRouter";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
