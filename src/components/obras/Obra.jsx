import React from "react";
import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { updateUser } from "../../firebase/firebase";

export const Obra = ({ nombreObra, userInfo, closeModal }) => {
  const handleChangeObra = async () => {
    const updatedUser = { ...userInfo };
    updatedUser.currentObra = nombreObra;
    await updateUser(updatedUser);
    console.log(updatedUser);
    window.location.reload();
  };
  return (
    <Box borderBottom="1px" borderColor="gray.500" p={5} onClick={closeModal}>
      <Flex justifyContent="space-between">
        <Text>{nombreObra}</Text>
        <Button
          size="sm"
          border="1px"
          borderColor="gray.500"
          onClick={handleChangeObra}
        >
          Cambiar
        </Button>
      </Flex>
    </Box>
  );
};
