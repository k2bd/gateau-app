import App from "./components/App";
import Game from "./components/Game";
import GamesRoute from "./components/GamesRoute";
import reportWebVitals from "./reportWebVitals";
import { BaseProvider, LightTheme } from "baseui";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";

const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="games" element={<GamesRoute />}>
                <Route path="" element={<></>} />
                <Route path=":gameId" element={<Game />} />
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
