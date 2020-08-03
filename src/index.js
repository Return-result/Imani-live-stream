import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import Radio from "./Radio";

ReactDOM.render(<Radio />, document.getElementById("root"));

serviceWorker.unregister();
