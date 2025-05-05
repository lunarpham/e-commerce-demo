import React from "react";
import { Flex } from "@chakra-ui/react";
import OrderHeader from "./components/OrderHeader";
import OrderSearch from "./components/OrderSearch";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";
import { useOrder } from "../../lib/hooks/useOrder";

export default function Order() {
  const {
    orders,
    order,
    isLoading,
    isDetailsOpen,
    searchTerm,
    setSearchTerm,
    handleViewOrderDetails,
    handleCloseOrderDetails,
    handleStatusChange,
  } = useOrder();

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
      <OrderHeader />
      <OrderSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <OrderList
        orders={orders}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onViewDetails={handleViewOrderDetails}
        onStatusChange={handleStatusChange}
      />
      <OrderDetails
        isOpen={isDetailsOpen}
        order={order}
        onClose={handleCloseOrderDetails}
        isLoading={isLoading}
      />
    </Flex>
  );
}
