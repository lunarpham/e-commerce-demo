import React from "react";
import {
  Table,
  Spinner,
  Flex,
  Button,
  Select,
  createListCollection,
  Box,
} from "@chakra-ui/react";
import { Eye } from "lucide-react";
import { formatDate } from "../../lib/utils";

export default function OrderList({
  orders,
  isLoading,
  searchTerm,
  onViewDetails,
  onStatusChange,
}) {
  const statusOptions = createListCollection({
    items: [
      { label: "Pending", value: "pending" },
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
    ],
  });

  const filteredOrders =
    orders?.filter(
      (order) =>
        order.id.toString().includes(searchTerm.toLowerCase()) ||
        (order.customer?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading && (!orders || orders.length === 0)) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box
      borderRadius={"lg"}
      overflow={"hidden"}
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Table.ScrollArea maxW={{ md: "full", base: "xl" }}>
        <Table.Root variant={"gray"}>
          <Table.Header>
            <Table.Row backgroundColor={"white"} color={"gray.500"}>
              <Table.Cell>ID</Table.Cell>
              <Table.Cell>Customer</Table.Cell>
              <Table.Cell>Total Price</Table.Cell>
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell textAlign={"right"}>Actions</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredOrders.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center" py={4}>
                  No orders found
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredOrders.map((order) => {
                return (
                  <Table.Row key={order.id} backgroundColor={"white"}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>
                      {order.customer?.name || "Customer"}
                    </Table.Cell>
                    <Table.Cell>${order.totalPrice.toFixed(2)}</Table.Cell>
                    <Table.Cell>{formatDate(order.createdAt)}</Table.Cell>
                    <Table.Cell>
                      <Box width="150px">
                        <Select.Root
                          collection={statusOptions}
                          value={[order.status]}
                          _hover={{ background: "gray.200" }}
                          onValueChange={(details) => {
                            const newStatus = details.value[0];
                            // Highlight the row briefly to indicate change
                            const rowElement = document.getElementById(
                              `order-row-${order.id}`
                            );
                            if (rowElement) {
                              rowElement.style.backgroundColor = "#f0f9ff";
                              setTimeout(() => {
                                rowElement.style.backgroundColor = "white";
                              }, 800);
                            }
                            onStatusChange(order.id, newStatus);
                          }}
                        >
                          <Select.Control>
                            <Select.Trigger
                              borderColor={"gray.200"}
                              borderWidth={1}
                              cursor={"pointer"}
                            >
                              <Select.ValueText
                                px={3}
                                backgroundColor={
                                  order.status === "delivered"
                                    ? "black"
                                    : "white"
                                }
                                color={
                                  order.status === "delivered"
                                    ? "white"
                                    : "black"
                                }
                                borderColor={
                                  order.status === "delivered"
                                    ? "black"
                                    : "gray.300"
                                }
                                borderWidth={1}
                                borderRadius={"full"}
                                fontSize={"85%"}
                                fontWeight={"medium"}
                              />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Select.Positioner>
                            <Select.Content
                              background={"white"}
                              borderRadius={"lg"}
                            >
                              {statusOptions.items.map((status) => (
                                <Select.Item
                                  key={status.value}
                                  item={status}
                                  backgroundColor={"white"}
                                  _hover={{ backgroundColor: "gray.200" }}
                                  borderRadius={"md"}
                                  cursor={"pointer"}
                                >
                                  {status.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Select.Root>
                      </Box>
                    </Table.Cell>
                    <Table.Cell textAlign={"right"}>
                      <Button
                        color={"black"}
                        background={"transparent"}
                        _hover={{ background: "gray.200" }}
                        onClick={() => onViewDetails(order.id)}
                      >
                        <Eye size={20} />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
}
