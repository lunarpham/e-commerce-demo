import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Sidebar({ routes }) {
  return (
    <Box
      as="aside"
      height="calc(100vh - 4rem)"
      overflow="auto"
      position="sticky"
      top="4rem"
      padding={4}
      color={"black"}
      backgroundColor="white"
      borderRightWidth={1}
      borderRightColor="gray.200"
    >
      {routes.map((route, index) => (
        <Flex
          as="a"
          href={route.route}
          key={index}
          direction="row"
          justifyContent="start"
          gap={"1rem"}
          px={4}
          py={2}
          borderRadius="md"
          alignItems="center"
          _hover={{
            background: "gray.200",
            cursor: "pointer",
          }}
        >
          {route.icon}
          <Text fontSize="sm" fontWeight="medium">
            {route.title}
          </Text>
        </Flex>
      ))}
    </Box>
  );
}
