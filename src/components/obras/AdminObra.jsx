import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { ObraDetails } from "./ObraDetails";

export const AdminObra = ({ nombreObra, fechaCreacion, jefeAsignado, id }) => {
  return (
    <Box borderBottom="1px" borderColor="gray.500" p={5}>
      <Flex justifyContent="space-between">
        <Text>{nombreObra}</Text>
        <Box>
          <ObraDetails
            nombreObra={nombreObra}
            fechaCreacion={fechaCreacion}
            jefeAsignado={jefeAsignado}
            id={id}
          />
        </Box>
      </Flex>
    </Box>
  );
};
