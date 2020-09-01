import React from "react";
import { getProduct } from "../ProductsService";

function ProductPage(props) {
  // Reading product ID from the URL path
  const productId = props.match.params.productId;

  const [product, setProduct] = React.useState(null);
  React.useEffect(() => {
    getProduct(productId)
      .then((response) => {
        const product = response.data;
        setProduct(product);
      })
      .catch((error) => {
        alert(`No Product with ID of '${productId}' exists!`);
        // Programmatically navigate
        props.history.push("/");
      });
  }, [productId]);

  return (
    <div className="product-page">
      {product ? (
        <>
          <h1>{product.name}</h1>
          <h3>${product.price}</h3>
          <p>Some Product Description</p>
          <img
            src={`/thumbnails/${product.imageUrl}`}
            alt={product.name}
            onError={(e) => (e.target.src = "/no-image.jpg")}
          />
        </>
      ) : null}
    </div>
  );
}

export default ProductPage;
