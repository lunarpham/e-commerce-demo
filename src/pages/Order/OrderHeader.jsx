import React from "react";
import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export default function OrderHeader() {
  return (
    <Flex gap={4} justifyContent="space-between">
      <Text as="h1" fontWeight={"bold"} fontSize="3xl">
        Orders
      </Text>
    </Flex>
  );
}
