import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { ENDPOINTS } from "../../api/endpoints";

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  error: null,
  isDetailsOpen: false,
  updatingOrderIds: [],
  statusSequence: ["pending", "processing", "shipped", "delivered"],
  optimisticUpdates: {}, // Track optimistic updates by orderId
};

// Simplified fetchOrders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(ENDPOINTS.ORDERS, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Simplified fetchOrderById with option to skip if we already have order data
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(ENDPOINTS.ORDER(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
  {
    // Only fetch if we don't already have the full order data
    condition: (id, { getState }) => {
      const { order } = getState().order;
      // Skip if we already have this order with detailed data
      return !(order && order.id === id && order.products);
    },
  }
);

// Status update with optimistic updates
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status, previousStatus, version }, { rejectWithValue }) => {
    try {
      // Include version in the payload
      const response = await axios.put(ENDPOINTS.ORDER_STATUS(id), {
        status,
        version,
      });
      return { ...response.data, id };
    } catch (error) {
      if (error.response?.status === 409) {
        return rejectWithValue({
          status: 409,
          message: "Version conflict - order has been modified",
          previousStatus,
        });
      }
      // When rejecting, include the previous status so we can revert
      return rejectWithValue({
        error: error.response?.data || error.message,
        previousStatus,
      });
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setIsDetailsOpen: (state, action) => {
      state.isDetailsOpen = action.payload;
    },
    // Set order details optimistically from existing data
    setOrderOptimistically: (state, action) => {
      state.order = action.payload;
    },
    // Update order status optimistically
    updateOrderStatusOptimistically: (state, action) => {
      const { id, status, previousStatus } = action.payload;
      state.optimisticUpdates[id] = { status, previousStatus };

      // Update in orders list
      const orderIndex = state.orders.findIndex((order) => order.id === id);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }

      // Update current order if it's the same one
      if (state.order && state.order.id === id) {
        state.order.status = status;
      }
    },
    // Revert an optimistic update if the API call fails
    revertOrderStatusUpdate: (state, action) => {
      const { id, status } = action.payload;

      // Update in orders list
      const orderIndex = state.orders.findIndex((order) => order.id === id);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = status;
      }

      // Update current order if it's the same one
      if (state.order && state.order.id === id) {
        state.order.status = status;
      }

      // Remove from optimistic updates
      delete state.optimisticUpdates[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        // Apply any pending optimistic updates
        const orders = action.payload.map((order) => {
          if (state.optimisticUpdates[order.id]) {
            return {
              ...order,
              status: state.optimisticUpdates[order.id].status,
            };
          }
          return order;
        });
        state.orders = orders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrderById.pending, (state) => {
        // Don't set isLoading=true if we're doing an optimistic update
        if (!state.order) {
          state.isLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;

        // Apply any pending optimistic update
        const order = action.payload;
        if (state.optimisticUpdates[order.id]) {
          order.status = state.optimisticUpdates[order.id].status;
        }

        state.order = order;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.pending, (state, action) => {
        const orderId = action.meta.arg.id;
        state.updatingOrderIds = [...state.updatingOrderIds, orderId];
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const orderId = action.meta.arg.id;

        // Remove from updating list
        state.updatingOrderIds = state.updatingOrderIds.filter(
          (id) => id !== orderId
        );

        // Remove from optimistic updates
        delete state.optimisticUpdates[orderId];

        // Update the order in the orders array with the new version using map
        if (action.payload) {
          state.orders = state.orders.map((order) =>
            order.id === orderId ? { ...order, ...action.payload } : order
          );

          // Also update current order if it's the same one
          if (state.order && state.order.id === orderId) {
            state.order = { ...state.order, ...action.payload };
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        const orderId = action.meta.arg.id;

        // Remove from updating list
        state.updatingOrderIds = state.updatingOrderIds.filter(
          (id) => id !== orderId
        );

        // Revert optimistic update if there was an error
        if (action.payload && action.payload.previousStatus) {
          const orderIndex = state.orders.findIndex(
            (order) => order.id === orderId
          );
          if (orderIndex !== -1) {
            state.orders[orderIndex].status = action.payload.previousStatus;
          }

          // Revert current order if it's the same one
          if (state.order && state.order.id === orderId) {
            state.order.status = action.payload.previousStatus;
          }

          // Remove from optimistic updates
          delete state.optimisticUpdates[orderId];
        }

        state.error = action.payload?.error || "Failed to update order status";
      });
  },
});

export const {
  clearOrder,
  clearError,
  setIsDetailsOpen,
  setOrderOptimistically,
  updateOrderStatusOptimistically,
  revertOrderStatusUpdate,
} = orderSlice.actions;

export default orderSlice.reducer;
