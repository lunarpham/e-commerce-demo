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
import { toaster } from "../../components/ui/toaster";

const initialState = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
  version: 1,
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
  const [formInitialData, setFormInitialData] = useState({ initialState });

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
        version: product.version || 1,
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
      version: 1,
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
      version: productFromList.version || 1,
    });
    setIsDialogOpen(true);
    dispatch(fetchProductById(productFromList.id));
  };

  const handleSubmit = async (formData) => {
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      category: formData.category.trim(),
      version: formData.version,
    };

    try {
      if (isEditMode && currentProductId) {
        const resultAction = await dispatch(
          updateProduct({ id: currentProductId, productData })
        );

        if (updateProduct.rejected.match(resultAction)) {
          // Handle specific error types
          if (resultAction.payload?.status === 404) {
            toaster.create({
              title: "Item Deleted",
              description:
                "The product you were trying to edit no longer exists.",
              type: "error",
              duration: 5000,
            });
            handleCloseDialog();
            return;
          } else if (
            resultAction.payload?.status === 409 ||
            resultAction.payload?.message?.includes("version")
          ) {
            // Handle version conflict
            toaster.create({
              title: "Update Conflict",
              description:
                "This product has been modified by someone else. The list has been refreshed.",
              type: "error",
              duration: 5000,
            });
            // Refresh products to get latest versions
            dispatch(fetchProducts());
            handleCloseDialog();
            return;
          }
        }

        if (!resultAction.error) {
          toaster.create({
            title: "Product updated",
            description: `${formData.name} has been updated successfully.`,
            type: "success",
            duration: 3000,
          });
          handleCloseDialog();
        }
      } else {
        delete productData.version; // Remove version for new product creation
        await dispatch(createProduct(productData));
        toaster.create({
          title: "Product created",
          description: `${formData.name} has been added to inventory.`,
          type: "success",
          duration: 3000,
        });
        handleCloseDialog();
      }
    } catch (error) {
      console.error("Error creating/updating product:", error);
      toaster.create({
        title: "Error",
        description:
          error.payload?.message || "Failed to save product information",
        type: "error",
        duration: 5000,
      });
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id));
        toaster.create({
          title: "Product deleted",
          description: "The product has been removed successfully.",
          type: "success",
          duration: 3000,
        });
      } catch (err) {
        console.error(err);
        toaster.create({
          title: "Error",
          description: "Failed to delete product",
          type: "error",
          duration: 5000,
        });
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
