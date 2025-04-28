import React from "react";
import { Table, Spinner, Flex, Button, Box } from "@chakra-ui/react";
import { SquarePen, Trash2 } from "lucide-react";

export default function ProductList({
  products,
  isLoading,
  searchTerm,
  onEditClick,
  onDeleteClick,
}) {
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading && products.length === 0) {
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
      <Table.ScrollArea>
        <Table.Root variant={"gray"} radius="lg">
          <Table.Header>
            <Table.Row
              backgroundColor={"white"}
              color={"gray.500"}
              fontWeight={"medium"}
            >
              <Table.Cell>ID</Table.Cell>
              <Table.Cell>Product Name</Table.Cell>
              <Table.Cell>Category</Table.Cell>
              <Table.Cell>Price</Table.Cell>
              <Table.Cell>Stock</Table.Cell>
              <Table.Cell textAlign={"right"}>Actions</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredProducts.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center" py={4}>
                  No products found
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredProducts.map((product) => (
                <Table.Row key={product.id} backgroundColor={"white"}>
                  <Table.Cell>{product.id}</Table.Cell>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.category || "N/A"}</Table.Cell>
                  <Table.Cell>${product.price.toFixed(2)}</Table.Cell>
                  <Table.Cell>{product.stock}</Table.Cell>
                  <Table.Cell>
                    <Flex justifyContent={"end"} gap={1}>
                      <Button
                        p={2}
                        _hover={{ background: "gray.200" }}
                        variant="solid"
                        onClick={() => onEditClick(product)}
                      >
                        <SquarePen size={16} />
                      </Button>
                      <Button
                        p={2}
                        _hover={{ background: "gray.200" }}
                        variant="solid"
                        onClick={() => onDeleteClick(product.id)}
                      >
                        <Trash2 size={16} color="red" />
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
}
