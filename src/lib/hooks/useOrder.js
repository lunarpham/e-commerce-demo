import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  fetchOrderById,
  updateOrderStatus,
  clearOrder,
  setIsDetailsOpen,
  setOrderOptimistically,
  updateOrderStatusOptimistically,
} from "../../store/slices/orderSlice";
import { toaster } from "../../components/ui/toaster";

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders, order, isLoading, isDetailsOpen, updatingOrderIds } =
    useSelector((state) => state.order);

  // UI-related state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);

  // Fetch orders on initial load
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Order action handlers
  const handleViewOrderDetails = async (orderId) => {
    setCurrentOrderId(orderId);

    // Set order data optimistically from the list first
    const orderFromList = orders.find((o) => o.id === orderId);
    if (orderFromList) {
      dispatch(setOrderOptimistically(orderFromList));
      dispatch(setIsDetailsOpen(true));
    }

    // Then fetch the full details
    dispatch(fetchOrderById(orderId));
  };

  const handleCloseOrderDetails = () => {
    dispatch(setIsDetailsOpen(false));
    dispatch(clearOrder());
  };

  // In the handleStatusChange function
  const handleStatusChange = (orderId, newStatus) => {
    const orderToUpdate = orders.find((o) => o.id === orderId);
    if (!orderToUpdate) return;

    const previousStatus = orderToUpdate.status;
    const orderName = `Order #${orderId}`;
    const currentVersion = orderToUpdate.version || 1;

    dispatch(
      updateOrderStatusOptimistically({
        id: orderId,
        status: newStatus,
        previousStatus,
        version: currentVersion,
      })
    );

    const loadingToast = toaster.create({
      title: "Updating order status",
      description: `Changing ${orderName} from ${previousStatus} to ${newStatus}`,
      type: "loading",
      duration: null,
    });

    dispatch(
      updateOrderStatus({
        id: orderId,
        status: newStatus,
        previousStatus,
        version: currentVersion,
      })
    )
      .unwrap()
      .then((updatedOrder) => {
        // Success handling
        toaster.dismiss(loadingToast.id);
        toaster.create({
          title: "Order updated",
          description: `${orderName} status changed to ${newStatus}`,
          type: "success",
          duration: 3000,
        });

        // Refresh orders list
        dispatch(fetchOrders());
      })
      .catch((error) => {
        toaster.dismiss(loadingToast.id);

        if (error.status === 409 || error.message?.includes("version")) {
          toaster.create({
            title: "Update Conflict",
            description:
              "This order has been modified by someone else. The list has been refreshed.",
            type: "error",
            duration: 5000,
          });
          dispatch(fetchOrders());
        } else {
          console.error("Failed to update order status:", error);
          toaster.create({
            title: "Update failed",
            description: `Failed to update ${orderName} status`,
            type: "error",
            duration: 5000,
          });
        }
      });
  };

  return {
    // Redux state
    orders,
    order,
    isLoading,
    isDetailsOpen,
    searchTerm,
    updatingOrderIds,

    // Actions
    setSearchTerm,
    handleViewOrderDetails,
    handleCloseOrderDetails,
    handleStatusChange,
  };
};
