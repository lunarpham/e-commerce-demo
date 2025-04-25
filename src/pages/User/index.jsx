import React from "react";
import { Flex } from "@chakra-ui/react";
import { useUser } from "../../lib/hooks/useUser";
import UserHeader from "./UserHeader";
import UserSearch from "./UserSearch";
import UserList from "./UserList";
import UserForm from "./UserForm";

export default function User() {
  const {
    // State
    users,
    user,
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
  } = useUser();

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
      <UserHeader onAddNewUser={handleOpenAddDialog} />
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UserList
        users={users}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <UserForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initialData={formInitialData}
        isEditMode={isEditMode}
        isLoading={isLoading}
      />
    </Flex>
  );
}
