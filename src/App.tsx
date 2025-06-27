import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { BasketballCourt, Teams } from "@app/components";
import { persistor, store } from "@app/redux/store";

import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Teams />
            <BasketballCourt />
          </div>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
