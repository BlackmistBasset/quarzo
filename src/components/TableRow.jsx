import React from "react";
import {
  Box,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { ModalDetails } from "../components/ModalDetails";

export const TableRow = ({
  fechaSolicitado,
  nombreItem,
  um,
  cantidad,
  fechaRequerido,
  estadoPedido,
  recibido,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack ml={5} px={1} border="1px">
      <Box
        fontWeight="bold"
        fontSize="12px"
        color="gray.600"
        w="10%"
        borderRight="1px"
        paddingLeft="10px"
        py="5px"
      >
        {fechaSolicitado}
      </Box>
      <Box
        fontWeight="bold"
        fontSize="12px"
        color="gray.600"
        w="25%"
        borderRight="1px"
        paddingLeft="10px"
        py="5px"
      >
        {nombreItem}
      </Box>
      <Box
        fontWeight="bold"
        fontSize="12px"
        color="gray.600"
        w="7%"
        paddingLeft="10px"
        borderRight="1px"
        py="5px"
      >
        {um}
      </Box>
      <Box
        fontWeight="bold"
        fontSize="12px"
        color="gray.600"
        w="7%"
        borderRight="1px"
        paddingLeft="10px"
        py="5px"
      >
        {cantidad}
      </Box>
      <Box
        fontWeight="bold"
        fontSize="12px"
        color="gray.600"
        w="15%"
        paddingLeft="10px"
        borderRight="1px"
        py="5px"
      >
        {fechaRequerido}
      </Box>
      <Box
        fontWeight="bold"
        fontSize="12px"
        color="gray.600"
        w="20%"
        borderRight="1px"
        paddingLeft="10px"
        py="5px"
      >
        {estadoPedido}
      </Box>
      <Box
        fontWeight="bold"
        fontSize="12px"
        color="gray.600"
        w="7%"
        borderRight="1px"
        paddingLeft="10px"
        py="5px"
      >
        {recibido}
      </Box>
      <Box
        fontWeight="bold"
        fontSize="12px"
        color="gray.600"
        w="12%"
        paddingLeft="10px"
        py="5px"
      >
        <Button
          variant="link"
          fontSize="12px"
          color="blue.500"
          onClick={onOpen}
        >
          Ver detalles
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl">
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent autoFocus={true}>
            <ModalDetails
              fechaSolicitado={fechaSolicitado}
              nombreItem={nombreItem}
              um={um}
              cantidad={cantidad}
              fechaRequerido={fechaRequerido}
              estadoPedido={estadoPedido}
              recibido={recibido}
            />
            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Editar Item
              </Button>
              <Button variant="ghost">Eliminar item</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </HStack>
  );
};
