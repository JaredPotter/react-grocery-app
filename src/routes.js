import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";
import ProductPage from "./containers/ProductPage";

const routes = (
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/products/:productId" component={ProductPage} />
  </Router>
);

export default routes;
