import React from "react";
import { Flex } from "@chakra-ui/react";
import OrderHeader from "./OrderHeader";
import OrderSearch from "./OrderSearch";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";
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
