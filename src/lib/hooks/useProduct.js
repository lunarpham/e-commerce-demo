import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  clearProduct,
  clearError,
} from "../../store/slices/productSlice";

const initialState = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
};

export const useProduct = () => {
  const dispatch = useDispatch();
  const { products, product, isLoading, error } = useSelector(
    (state) => state.product
  );

  // UI-related state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formInitialData, setFormInitialData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  // Fetch products on initial load
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Update form data when product is loaded in edit mode
  useEffect(() => {
    if (product && isEditMode) {
      setFormInitialData({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category || "",
      });
    }
  }, [product, isEditMode]);

  // Dialog management functions
  const handleOpenAddDialog = () => {
    setFormInitialData({
      name: "",
      description: "",
      price: "0",
      stock: "0",
      category: "",
    });
    setIsEditMode(false);
    setCurrentProductId(null);
    dispatch(clearProduct());
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    dispatch(clearProduct());
  };

  // Product action handlers
  const handleEditClick = async (productFromList) => {
    setCurrentProductId(productFromList.id);
    setIsEditMode(true);
    setFormInitialData({
      name: productFromList.name || "",
      description: productFromList.description || "",
      price: productFromList.price ? productFromList.price.toString() : "0",
      stock: productFromList.stock ? productFromList.stock.toString() : "0",
      category: productFromList.category || "",
    });
    setIsDialogOpen(true);
    dispatch(fetchProductById(productFromList.id));
  };

  const handleSubmit = async (formData) => {
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      category: formData.category,
    };

    try {
      if (isEditMode && currentProductId) {
        await dispatch(updateProduct({ id: currentProductId, productData }));
      } else {
        await dispatch(createProduct(productData));
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error creating/updating product:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return {
    // Redux state
    products,
    product,
    isLoading,
    error,

    // Redux action dispatchers
    fetchProducts: (params) => dispatch(fetchProducts(params)),
    fetchProductById: (id) => dispatch(fetchProductById(id)),
    createProduct: (data) => dispatch(createProduct(data)),
    updateProduct: (id, productData) =>
      dispatch(updateProduct({ id, productData })),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    clearProduct: () => dispatch(clearProduct()),
    clearError: () => dispatch(clearError()),

    // UI state
    isDialogOpen,
    isEditMode,
    searchTerm,
    formInitialData,

    // UI actions
    setSearchTerm,
    handleOpenAddDialog,
    handleCloseDialog,
    handleEditClick,
    handleSubmit,
    handleDeleteClick,
  };
};
