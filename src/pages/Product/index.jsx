import React from "react";
import { Flex } from "@chakra-ui/react";
import { useProduct } from "../../lib/hooks/useProduct";
import ProductHeader from "./ProductHeader";
import ProductSearch from "./ProductSearch";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

export default function Product() {
  const {
    // State
    products,
    product,
    isLoading,
    isDialogOpen,
    isEditMode,
    searchTerm,
    formInitialData,

    // Actions
    setSearchTerm,
    handleOpenAddDialog,
    handleCloseDialog,
    handleEditClick,
    handleSubmit,
    handleDeleteClick,
  } = useProduct();

  return (
    <Flex
      as="div"
      direction={"column"}
      gap="4"
      padding={8}
      color={"black"}
      minHeight="100vh"
      backgroundColor="white"
    >
      <ProductHeader onAddClick={handleOpenAddDialog} />
      <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductList
        products={products}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <ProductForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initialData={formInitialData}
        isEditMode={isEditMode}
        isLoading={isLoading}
        product={product}
      />
    </Flex>
  );
}
