import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Root from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css/bundle";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Root>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Root>
);

reportWebVitals();
{
  /* <React.StrictMode>
</React.StrictMode> */
}
