// import * as React from "react";
// import * as ReactDOM from "react-dom";

import ReactDOM from "./lea-react-9/react-dom";
// import Component from "./lea-react/Component";

import "./index.css";
// import SetStatePage from "./pages/SetStatePage";
// import ExamplePage from "./pages/ExamplePage";
import jsx from "./pages/ExamplePage"; // TAG 为何这样导入,直接获取虚拟dom对象

// console.log('jsx-------------------', jsx)
ReactDOM.render(jsx, document.getElementById("root"));
// console.log("React", React.version); //sy-log
