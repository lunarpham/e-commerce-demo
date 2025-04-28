import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  isLoading: false,
  stats: {
    totalRevenue: {
      value: 0,
      percentChange: 0,
    },
    products: {
      value: 0,
      change: 0,
      percentChange: 0,
    },
    orders: {
      value: 0,
      change: 0,
      percentChange: 0,
    },
    users: {
      value: 0,
      newUsers: 0,
      percentChange: 0,
    },
  },
  monthlySales: [],
  recentSales: [],
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload;

        // Set stats with comparison values
        state.stats = {
          totalRevenue: {
            value: data.totalRevenue,
            percentChange: data.revenueChange,
          },
          products: {
            value: data.stats.products.current,
            change: data.stats.products.current - data.stats.products.previous,
            percentChange: data.stats.products.percentChange,
          },
          orders: {
            value: data.stats.orders.current,
            change: data.stats.orders.current - data.stats.orders.previous,
            percentChange: data.stats.orders.percentChange,
          },
          users: {
            value: data.activeUsers,
            newUsers: data.newUsers,
            percentChange: data.stats.users.percentChange,
          },
        };

        // Transform monthly revenue data
        state.monthlySales = data.monthlyRevenue.map((item) => ({
          month: item.month,
          sales: item.revenue,
        }));

        // Set recent sales
        state.recentSales = data.recentSales.map((sale) => ({
          id: sale.id || Math.random().toString(36).substr(2, 9),
          customerName: sale.customerName,
          customerEmail: sale.customerEmail,
          amount: sale.amount,
          date: sale.date,
        }));
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
