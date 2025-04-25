import React from "react";
import { Flex, Input } from "@chakra-ui/react";

export default function UserSearch({ searchTerm, setSearchTerm }) {
  return (
    <Flex>
      <Input
        placeholder="Search user..."
        width={"md"}
        borderWidth={1}
        borderColor="gray.300"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </Flex>
  );
}
