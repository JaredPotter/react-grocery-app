import React from "react";
import "./Product.css";

function Product({ product }) {
  return (
    <div className="product-container">
      <img src={`./thumbnails/${product.imageUrl}`} alt={product.name} />
      <div>{product.name}</div>
      <div>${product.price}</div>
    </div>
  );
}

export default Product;
