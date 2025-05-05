import React from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import { Plus } from "lucide-react";

export default function UserHeader({ onAddNewUser }) {
  return (
    <Flex gap={4} justifyContent="space-between" alignItems="center">
      <Text as="h1" fontWeight={"bold"} fontSize="3xl">
        Users
      </Text>
      <Button
        backgroundColor={"black"}
        color={"white"}
        onClick={onAddNewUser}
        _hover={{ opacity: 0.85 }}
      >
        <Plus size={16} color="white" /> Add User
      </Button>
    </Flex>
  );
}
