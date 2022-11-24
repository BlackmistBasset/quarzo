import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

export const AdminObra = () => {
  return (
    <Box borderBottom="1px" borderColor="gray.500" p={5}>
      <Flex justifyContent="space-between">
        <Text>Nombre de la Obra</Text>
        <Box>
          <Button size="sm" border="1px" borderColor="gray.500" m={1}>
            Ver obra
          </Button>
          <Button size="sm" border="1px" borderColor="gray.500" m={1}>
            Eliminar obra
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
