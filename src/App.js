import React from "react";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import { getProducts } from "./ProductsService";

function App() {
  const [products, setProducts] = React.useState(() => {
    fetchProducts();

    return [];
  });

  function fetchProducts() {
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        debugger;
      });
  }

  return (
    <div className="App">
      <h1>React Grocery App</h1>
      <ProductGrid products={products} />
    </div>
  );
}

export default App;
