import React, { useState, useEffect } from "react";
import {
  Dialog,
  Flex,
  Button,
  Input,
  Textarea,
  Field,
  Fieldset,
  Text,
} from "@chakra-ui/react";
import { X } from "lucide-react";

export default function ProductForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
      });
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
      newErrors.name = "Product name is required";
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
                {isEditMode ? "Edit Product" : "Add New Product"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY={4}>
              <Fieldset.Root>
                <Fieldset.Content>
                  <Field.Root isInvalid={!!errors.name}>
                    <Field.Label>Name</Field.Label>
                    <Input
                      name="name"
                      placeholder={errors.name ? errors.name : "Product Name"}
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
                        {" "}
                        {errors.name}{" "}
                      </Text>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Textarea
                      name="description"
                      placeholder="Product Description"
                      width={"100%"}
                      borderWidth={1}
                      borderColor="gray.200"
                      _focus={{
                        ring: "2px",
                        ringOffset: "2px",
                        ringColor: "black",
                      }}
                      height={36}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </Field.Root>

                  <Flex gap={4}>
                    <Field.Root width={"50%"}>
                      <Field.Label>Price</Field.Label>
                      <Input
                        name="price"
                        type="number"
                        placeholder="Product Price"
                        width={"100%"}
                        borderWidth={1}
                        borderColor="gray.200"
                        _focus={{
                          ring: "2px",
                          ringOffset: "2px",
                          ringColor: "black",
                        }}
                        height={10}
                        step={0.01}
                        min={0}
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </Field.Root>
                    <Field.Root width={"50%"}>
                      <Field.Label>Stock</Field.Label>
                      <Input
                        name="stock"
                        type="number"
                        placeholder="Product Stock"
                        width={"100%"}
                        borderWidth={1}
                        borderColor="gray.200"
                        _focus={{
                          ring: "2px",
                          ringOffset: "2px",
                          ringColor: "black",
                        }}
                        height={10}
                        step={1}
                        min={0}
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </Field.Root>
                  </Flex>

                  <Field.Root width={"100%"}>
                    <Field.Label>Category</Field.Label>
                    <Input
                      name="category"
                      placeholder="Product Category"
                      width={"100%"}
                      borderWidth={1}
                      borderColor="gray.200"
                      _focus={{
                        ring: "2px",
                        ringOffset: "2px",
                        ringColor: "black",
                      }}
                      height={10}
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Flex justifyContent={"end"} gap={2}>
                <Button
                  borderRadius="md"
                  color={"black"}
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
