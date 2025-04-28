import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../../store/slices/dashboardSlice";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, stats, monthlySales, recentSales, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return {
    isLoading,
    stats,
    monthlySales,
    recentSales,
    error,
  };
};
