import React from "react";
import {
  Dialog,
  Flex,
  Button,
  Text,
  Box,
  Spinner,
  Table,
  Badge,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { formatDateWithTime } from "../../../lib/utils";

export default function OrderDetails({ isOpen, order, onClose, isLoading }) {
  if (!order && !isLoading) {
    return null;
  }

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => onClose(!e.open)}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content minWidth="600px" backgroundColor={"white"}>
          <Dialog.CloseTrigger top={4} right={4}>
            <X size={24} color="black" cursor={"pointer"} />
          </Dialog.CloseTrigger>

          {isLoading ? (
            <Flex justify="center" padding={8}>
              <Spinner size="xl" />
            </Flex>
          ) : order ? (
            <>
              <Dialog.Header>
                <Dialog.Title>Order #{order.id} Details</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Flex gap={8}>
                  <Box flex={1}>
                    <Text fontWeight="medium" color={"gray.500"}>
                      Customer
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                      {order.customer?.name || "Customer Name"}
                    </Text>
                    <Text color="gray.700">
                      {order.customer?.email || "customer@example.com"}
                    </Text>
                  </Box>

                  {/* Order Information */}
                  <Box flex={1}>
                    <Text fontWeight="medium" color={"gray.500"}>
                      Order Info
                    </Text>
                    <Text>Date: {formatDateWithTime(order.createdAt)}</Text>
                    <Flex alignItems="center" gap={2}>
                      <Text>Status:</Text>
                      <Text
                        px={3}
                        backgroundColor={
                          order.status === "delivered" ? "black" : "white"
                        }
                        color={order.status === "delivered" ? "white" : "black"}
                        borderColor={
                          order.status === "delivered" ? "black" : "gray.300"
                        }
                        fontWeight={"semibold"}
                        borderWidth={1}
                        borderRadius={"full"}
                        fontSize={"85%"}
                        textTransform={"capitalize"}
                      >
                        {order.status}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>

                <Box mt={6}>
                  <Text fontWeight="medium" fontSize="lg" mb={2}>
                    Product Summary
                  </Text>

                  <Table.Root
                    variant="simple"
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor={"gray.300"}
                  >
                    <Table.Header>
                      <Table.Row color={"gray.500"}>
                        <Table.Cell fontWeight="medium" width="60%">
                          Product
                        </Table.Cell>
                        <Table.Cell fontWeight="medium" textAlign="right">
                          Price
                        </Table.Cell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {order.products && order.products.length > 0 ? (
                        order.products.map((product) => (
                          <Table.Row key={product.id}>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell textAlign="right">
                              ${product.price.toFixed(2)}
                            </Table.Cell>
                          </Table.Row>
                        ))
                      ) : (
                        <Table.Row>
                          <Table.Cell colSpan={2} textAlign="center">
                            <Flex
                              justify="center"
                              align="center"
                              height="100px"
                            >
                              <Spinner size="xl" />
                            </Flex>
                          </Table.Cell>
                        </Table.Row>
                      )}

                      <Table.Row>
                        <Table.Cell fontWeight="bold">Total</Table.Cell>
                        <Table.Cell fontWeight="bold" textAlign="right">
                          ${order.totalPrice.toFixed(2)}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Dialog.Body>

              <Dialog.Footer>
                <Flex justifyContent={"end"} gap={2}>
                  <Button
                    borderRadius="md"
                    color={"white"}
                    _hover={{ opacity: 0.85 }}
                    borderWidth={1}
                    borderColor={"black"}
                    backgroundColor={"black"}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </Flex>
              </Dialog.Footer>
            </>
          ) : (
            <Dialog.Body>
              <Text>No order data available</Text>
            </Dialog.Body>
          )}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
