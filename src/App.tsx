import React from "react";
import { HashRouter as Router } from "react-router-dom";

import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "./dx-styles.scss";

import { TasksPage } from "./pages";

export default function Root() {
  return (
    <Router>
      <div className="app">
        <TasksPage />
      </div>
    </Router>
  );
}
