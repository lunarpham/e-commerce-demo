import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  clearUser,
  clearError,
} from "../../store/slices/userSlice";
import { toaster } from "../../components/ui/toaster";

export const useUser = () => {
  const dispatch = useDispatch();
  const { users, user, isLoading, error } = useSelector((state) => state.user);

  // UI-related state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [formInitialData, setFormInitialData] = useState({
    name: "",
    email: "",
    role: "customer",
  });

  // Fetch users on initial load
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Update form data when user is loaded in edit mode
  useEffect(() => {
    if (user && isEditMode) {
      setFormInitialData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "customer",
      });
    }
  }, [user, isEditMode]);

  // Dialog management functions
  const handleOpenAddDialog = () => {
    setFormInitialData({
      name: "",
      email: "",
      role: "customer",
    });
    setIsEditMode(false);
    setCurrentUserId(null);
    dispatch(clearUser());
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    dispatch(clearUser());
  };

  // User action handlers
  const handleEditClick = async (userFromList) => {
    setCurrentUserId(userFromList.id);
    setIsEditMode(true);
    setFormInitialData({
      name: userFromList.name || "",
      email: userFromList.email || "",
      role: userFromList.role || "customer",
    });
    setIsDialogOpen(true);
    dispatch(fetchUserById(userFromList.id));
  };

  const handleSubmit = async (formData) => {
    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    try {
      if (isEditMode && currentUserId) {
        await dispatch(updateUser({ id: currentUserId, userData }));
        toaster.create({
          title: "User updated",
          description: `${formData.name}'s profile has been updated.`,
          type: "success",
          duration: 3000,
        });
      } else {
        await dispatch(createUser(userData));
        toaster.create({
          title: "User created",
          description: `${formData.name} has been added as a new ${formData.role}.`,
          type: "success",
          duration: 3000,
        });
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error creating/updating user:", error);
      toaster.create({
        title: "Error",
        description: "Failed to save user information",
        type: "error",
        duration: 5000,
      });
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(id));
        toaster.create({
          title: "User deleted",
          description: "The user has been removed successfully.",
          type: "success",
          duration: 3000,
        });
      } catch (err) {
        console.error(err);
        toaster.create({
          title: "Error",
          description: "Failed to delete user",
          type: "error",
          duration: 5000,
        });
      }
    }
  };

  return {
    // Redux state
    users,
    user,
    isLoading,
    error,

    // Redux action dispatchers
    fetchUsers: (params) => dispatch(fetchUsers(params)),
    fetchUserById: (id) => dispatch(fetchUserById(id)),
    createUser: (data) => dispatch(createUser(data)),
    updateUser: (id, userData) => dispatch(updateUser({ id, userData })),
    deleteUser: (id) => dispatch(deleteUser(id)),
    clearUser: () => dispatch(clearUser()),
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
