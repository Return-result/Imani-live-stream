import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "./index.css";
import Radio from "./Radio";

ReactDOM.render(<Radio />, document.getElementById("root"));

<<<<<<< HEAD

serviceWorker.unregister();
=======
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
>>>>>>> 447c6b3a14ca7d01b981103fbaf3b28bd603e502
