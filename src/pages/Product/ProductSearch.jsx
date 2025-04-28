import React from "react";
import { Flex, Input } from "@chakra-ui/react";

export default function ProductSearch({ searchTerm, setSearchTerm }) {
  return (
    <Flex>
      <Input
        placeholder="Search product..."
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
