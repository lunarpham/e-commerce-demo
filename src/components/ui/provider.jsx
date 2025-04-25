"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

export function UIProvider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
