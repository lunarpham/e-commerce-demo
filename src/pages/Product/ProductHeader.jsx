import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";

export default function ProductHeader({ onAddClick }) {
  return (
    <Flex gap={4} justifyContent="space-between">
      <Text as="h1" fontWeight={"bold"} fontSize="3xl">
        Products
      </Text>
      <Button
        backgroundColor={"black"}
        color={"white"}
        variant="solid"
        onClick={onAddClick}
        _hover={{ opacity: 0.85 }}
      >
        <Plus size={16} color="white" /> Add Product
      </Button>
    </Flex>
  );
}
