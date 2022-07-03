import React from "react";
import { HashRouter as Router } from "react-router-dom";

import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "./dx-styles.scss";

import DataGridExample from "./views/DataGridExample";

export default function Root() {
  return (
    <Router>
      <div className="app">
        <DataGridExample />
      </div>
    </Router>
  );
}
