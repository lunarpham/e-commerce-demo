import React from "react";
import { Flex, Input } from "@chakra-ui/react";

export default function UserSearch({ searchTerm, setSearchTerm }) {
  return (
    <Flex>
      <Input
        placeholder="Search user..."
        width={"md"}
        borderWidth={1}
        borderColor="gray.200"
        _focus={{
          ring: "2px",
          ringOffset: "2px",
          ringColor: "black",
        }}
        borderRadius={"md"}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </Flex>
  );
}
