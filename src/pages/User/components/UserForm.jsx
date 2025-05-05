import React, { useState, useEffect } from "react";
import {
  Dialog,
  Flex,
  Button,
  Input,
  Field,
  Fieldset,
  Text,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { X } from "lucide-react";

export default function UserForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode,
  isLoading,
}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const roles = createListCollection({
    items: [
      { label: "Customer", value: "customer" },
      { label: "Admin", value: "admin" },
    ],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
    setErrors({});
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => onClose(!e.open)}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content backgroundColor={"white"}>
          <form onSubmit={handleSubmit}>
            <Dialog.CloseTrigger top={4} right={4}>
              <X size={24} color="black" cursor={"pointer"} />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>
                {isEditMode ? "Edit User" : "Add New User"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY={4}>
              <Fieldset.Root>
                <Fieldset.Content>
                  <Field.Root isInvalid={!!errors.name}>
                    <Field.Label>Name</Field.Label>
                    <Input
                      name="name"
                      placeholder="Full Name"
                      width={"100%"}
                      borderWidth={1}
                      borderColor={errors.name ? "red.500" : "gray.200"}
                      _focus={{
                        ring: "2px",
                        ringOffset: "2px",
                        ringColor: "black",
                      }}
                      height={10}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.name && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.name}
                      </Text>
                    )}
                  </Field.Root>

                  <Field.Root isInvalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="user@example.com"
                      width={"100%"}
                      borderWidth={1}
                      borderColor={errors.email ? "red.500" : "gray.200"}
                      height={10}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      _focus={{
                        ring: "2px",
                        ringOffset: "2px",
                        ringColor: "black",
                      }}
                    />
                    {errors.email && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.email}
                      </Text>
                    )}
                  </Field.Root>
                  <Field.Root width={"100%"}>
                    <Select.Root
                      collection={roles}
                      value={[formData.role]} // Use value (as array) instead of defaultValue
                      onValueChange={(details) => {
                        const selectedRole = details.value[0];
                        setFormData((prev) => ({
                          ...prev,
                          role: selectedRole,
                        }));
                      }}
                    >
                      <Select.HiddenSelect name="role" />
                      <Select.Label>Role</Select.Label>
                      <Select.Control>
                        <Select.Trigger
                          borderColor={"gray.200"}
                          borderWidth={1}
                        >
                          <Select.ValueText placeholder="Select Role" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content
                          background={"white"}
                          borderRadius={"lg"}
                        >
                          {roles.items.map((role) => (
                            <Select.Item
                              key={role.value}
                              item={role}
                              backgroundColor={"white"}
                              _hover={{ backgroundColor: "gray.200" }}
                              borderRadius={"md"}
                            >
                              {role.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Flex justifyContent={"end"} gap={2}>
                <Button
                  borderRadius="md"
                  color={"black"}
                  background={"transparent"}
                  _hover={{ backgroundColor: "gray.200" }}
                  borderWidth={1}
                  borderColor={"gray.300"}
                  onClick={() => onClose(false)}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius="md"
                  backgroundColor={"black"}
                  color={"white"}
                  _hover={{ opacity: 0.85 }}
                  borderWidth={1}
                  borderColor={"black"}
                  isLoading={isLoading}
                  type="submit"
                >
                  {isEditMode ? "Update" : "Save"}
                </Button>
              </Flex>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
