import React from "react";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { AlignJustify } from "lucide-react";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      bg="white"
      px={8}
      color="black"
      align="center"
      justify="space-between"
      borderBottom="solid"
      borderColor="gray.200"
      borderWidth={1}
      zIndex={1000}
      minHeight="4rem"
      position="sticky"
      top="0"
    >
      <Flex align="center" gap={4}>
        <IconButton
          variant="plain"
          background={"white"}
          color="black"
          size="sm"
          fontWeight="semibold"
          outline={false}
          borderColor={"gray.300"}
          borderWidth={1}
          borderRadius="md"
          _hover={{ background: "gray.200" }}
          display={{ base: "flex", md: "none" }}
          onClick={() => window.toggleDrawer && window.toggleDrawer()}
        >
          <AlignJustify size={24} color="black" />
        </IconButton>

        <Text as={"a"} fontSize="lg" fontWeight="semibold" href="/">
          E-commerce Dashboard
        </Text>
      </Flex>
    </Flex>
  );
}
