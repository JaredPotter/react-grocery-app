import React from "react";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import Modal from "./components/Modal";
import AddEditProductForm from "./components/AddEditProductForm";
import LoadingSpinner from "./components/LoadingSpinner";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./ProductsService";

function App() {
  const [
    isShowingAddEditProductModal,
    setIsShowingAddEditProductModal,
  ] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [originalProducts, setOriginalProducts] = React.useState([]);
  const [products, setProducts] = React.useState(() => {
    fetchProducts();

    return [];
  });
  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    if (!searchQuery) {
      setProducts(originalProducts);
      return;
    }

    const filteredProducts = originalProducts.filter((product) => {
      const searchQueryLowerCase = searchQuery.toLowerCase();
      const productNameLowerCase = product.name.toLowerCase();

      if (productNameLowerCase.includes(searchQueryLowerCase)) {
        return true;
      }
    });

    setProducts(filteredProducts);
  }, [searchQuery, originalProducts]);

  function fetchProducts() {
    setIsLoading(true);

    getProducts()
      .then((response) => {
        setOriginalProducts(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        debugger;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddProductClick() {
    setCurrentProduct(null);
    setIsShowingAddEditProductModal(true);
  }

  function handleCloseModal() {
    setIsShowingAddEditProductModal(false);
  }

  function handleCreateProduct(product, password) {
    if (!isPasswordValid(password)) {
      alert("Password is invalid!");
      return;
    }

    createProduct(product, password)
      .then((response) => {
        setIsShowingAddEditProductModal(false);
        alert("SUCCESSFULLY CREATE NEW ITEM");
        fetchProducts();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function handleEditProduct(product) {
    setCurrentProduct(product);
    setIsShowingAddEditProductModal(true);
  }

  function handleUpdateProduct(product, password) {
    if (!isPasswordValid(password)) {
      alert("Password is invalid!");
      return;
    }

    updateProduct(product._id, product, password)
      .then((response) => {
        setIsShowingAddEditProductModal(false);
        alert("SUCCESSFULLY UPDATED PRODUCT");
        fetchProducts();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function handleDeleteProduct(product, password) {
    if (!isPasswordValid(password)) {
      alert("Password is invalid!");
      return;
    }

    deleteProduct(product._id, password)
      .then((response) => {
        setIsShowingAddEditProductModal(false);
        alert("SUCCESSFULLY DELETED PRODUCT");
        fetchProducts();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  function isPasswordValid(password) {
    if (!password) {
      return false;
    }

    return true;
  }

  return (
    <div className="App">
      <button onClick={handleAddProductClick}>CREATE NEW PRODUCT</button>
      {isShowingAddEditProductModal ? (
        <Modal>
          <AddEditProductForm
            existingProduct={currentProduct}
            handleCloseModal={handleCloseModal}
            handleCreateProduct={handleCreateProduct}
            handleUpdateProduct={handleUpdateProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        </Modal>
      ) : null}
      <h1>React Grocery App</h1>
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      {isLoading ? <LoadingSpinner type="roller" /> : null}
      <ProductGrid products={products} handleEditProduct={handleEditProduct} />
      {!isLoading && products.length === 0 ? <h3>No Results Found</h3> : null}
    </div>
  );
}

export default App;
