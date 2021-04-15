// import * as React from "react";
// import * as ReactDOM from "react-dom";

import ReactDOM from "./lea-react/react-dom";
import Component from "./lea-react/Component";

import "./index.css";
// import SetStatePage from "./pages/SetStatePage";
// import ExamplePage from "./pages/ExamplePage";
import jsx from "./pages/ExamplePage"; // TAG ?为何这样导入

console.log('jsx-------------------', jsx)
ReactDOM.render(jsx, document.getElementById("root"));
// console.log("React", React.version); //sy-log
