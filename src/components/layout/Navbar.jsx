import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { AlignJustify } from "lucide-react";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      bg="white"
      px={4}
      color="black"
      align="center"
      justify="space-between"
      position="sticky"
      borderBottom="solid"
      borderColor="gray.200"
      top={0}
      zIndex={1000}
      minHeight="4rem"
    >
      <Flex align="center" gap={4}>
        <Button
          variant="plain"
          background={"white"}
          color="black"
          size="sm"
          fontWeight="semibold"
          outline={false}
          borderColor={"gray.400"}
          borderWidth={2}
          borderRadius="md"
          _hover={{ background: "gray.200" }}
          _active={{ background: "blue.700" }}
          _focus={{ boxShadow: "outline" }}
          lg={{ display: "none" }}
          md={{ display: "none" }}
          display={{ base: "flex", md: "none" }}
        >
          <AlignJustify size={24} color="black" />
        </Button>
        <Text as={"a"} fontSize="lg" fontWeight="semibold" href="/">
          E-commerce Dashboard
        </Text>
      </Flex>
    </Flex>
  );
}
