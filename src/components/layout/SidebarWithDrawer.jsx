import React, { useState } from "react";
import { Box, Drawer, Portal, Flex, Text, CloseButton } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

export default function SidebarWithDrawer({ routes }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const desktopSidebar = (
    <Box display={{ base: "none", md: "block" }} position="sticky" top="4rem">
      <Sidebar routes={routes} />
    </Box>
  );

  const mobileDrawer = (
    <Drawer.Root
      placement={"start"}
      open={isDrawerOpen}
      onOpenChange={(e) => setIsDrawerOpen(e.open)}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content backgroundColor={"white"} color={"black"}>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body p={4} mt={4}>
              <Box as="aside">
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
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );

  return (
    <>
      {desktopSidebar}
      {mobileDrawer}
      {/* Export the toggle function for Navbar to use */}
      {(window.toggleDrawer = () => setIsDrawerOpen((prev) => !prev))}
    </>
  );
}
