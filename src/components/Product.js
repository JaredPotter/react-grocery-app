import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

function Product({ product, handleEditProduct }) {
  return (
    <div className="product-container">
      <Link to={`/products/${product._id}`}>
        <img
          src={`./thumbnails/${product.imageUrl}`}
          alt={product.name}
          onError={(e) => (e.target.src = "./no-image.jpg")}
        />
        <div>{product.name}</div>
        <div>${product.price}</div>
      </Link>
      <button onClick={() => handleEditProduct(product)}>EDIT</button>
    </div>
  );
}

export default Product;
