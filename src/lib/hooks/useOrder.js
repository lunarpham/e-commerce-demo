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

  const confirmStatusChange = (orderId, newStatus) => {
    const orderToUpdate = orders.find((o) => o.id === orderId);
    if (!orderToUpdate) return;

    const previousStatus = orderToUpdate.status;
    const orderName = `Order #${orderId}`;

    // Apply optimistic update immediately
    dispatch(
      updateOrderStatusOptimistically({
        id: orderId,
        status: newStatus,
        previousStatus,
      })
    );

    // Then update the status in the background
    dispatch(
      updateOrderStatus({
        id: orderId,
        status: newStatus,
        previousStatus,
      })
    )
      .unwrap()
      .catch((error) => {
        console.error("Failed to update order status:", error);
        toaster.error(`Failed to update ${orderName} status`);
      });
  };
  // Simplified status change handler - directly applies changes without warning
  const handleStatusChange = (orderId, newStatus) => {
    confirmStatusChange(orderId, newStatus);
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
