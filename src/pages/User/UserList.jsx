import React from "react";
import { Table, Spinner, Flex, Button, Text } from "@chakra-ui/react";
import { SquarePen, Trash2 } from "lucide-react";
import { formatDate } from "../../lib/utils";

export default function UserList({
  users,
  isLoading,
  searchTerm,
  onEditClick,
  onDeleteClick,
}) {
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading && users.length === 0) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Table.Root
      variant={"gray"}
      borderWidth="1px"
      borderColor="gray.200"
      fontWeight={"medium"}
      borderRadius="lg"
    >
      <Table.Header>
        <Table.Row backgroundColor={"white"} color={"gray.500"}>
          <Table.Cell>ID</Table.Cell>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Email</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Created at</Table.Cell>
          <Table.Cell textAlign={"right"}>Actions</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredUsers.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={6} textAlign="center" py={4}>
              No users found
            </Table.Cell>
          </Table.Row>
        ) : (
          filteredUsers.map((user) => (
            <Table.Row key={user.id} backgroundColor={"white"}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"xs"}
                  borderRadius={"full"}
                  backgroundColor={user.role === "admin" ? "black" : "white"}
                  color={user.role === "admin" ? "white" : "black"}
                  borderWidth={1}
                  borderColor={user.role === "admin" ? "black" : "gray.300"}
                  textAlign={"center"}
                  textTransform={"lowercase"}
                  px={3}
                  width={"fit"}
                >
                  {user.role}
                </Text>
              </Table.Cell>
              <Table.Cell>{formatDate(user.createdAt) || "N/A"}</Table.Cell>
              <Table.Cell>
                <Flex justifyContent={"end"} gap={0}>
                  <Button
                    p={2}
                    __hover={{ background: "gray.400" }}
                    variant="solid"
                    onClick={() => onEditClick(user)}
                  >
                    <SquarePen size={20} />
                  </Button>
                  <Button
                    p={2}
                    __hover={{ background: "gray.400" }}
                    variant="solid"
                    onClick={() => onDeleteClick(user.id)}
                  >
                    <Trash2 size={20} color="red" />
                  </Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
}
