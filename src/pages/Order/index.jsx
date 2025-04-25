import React from "react";
import { Flex } from "@chakra-ui/react";

export default function Order() {
  return (
    <Flex
      as="div"
      direction={"column"}
      gap="4"
      padding={8}
      color={"black"}
      minHeight="100vh"
      backgroundColor="white"
    >
      Hello World
    </Flex>
  );
}
