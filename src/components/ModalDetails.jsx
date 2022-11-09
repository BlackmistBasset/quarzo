import React from "react";

import {
  Button,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Container,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";

export const ModalDetails = () => {
  return (
    <>
      <ModalHeader>Nombre del Item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <h2>Detalle</h2>
        <Container border="1px">Aca van los detalles del item.</Container>
        <Flex>
          <Box>
            <h2>Unidad de medida: Kilo</h2>
            <h2>Fecha solicitado: 07/11/2022</h2>

            <h2>ESTADO DEL PEDIDO: COMPRADO</h2>
            <h2>ESTADO DE LA ENTREGA: Entrega el proveedor 13/11/2022</h2>
            <h2>RECIBIDO EN OBRA: OK</h2>
          </Box>
          <Box>
            <h2>Cantidad: 250</h2>
            <h2>Fecha requerido: 15/11/2022</h2>
          </Box>
        </Flex>

        <Button
          fontSize="15px"
          border="1px"
          borderColor="gray.500"
          _hover={{ bg: "blackAlpha.400" }}
        >
          Detalles adicionales
        </Button>
        <Button
          fontSize="15px"
          border="1px"
          borderColor="gray.500"
          _hover={{ bg: "blackAlpha.400" }}
        >
          Proveedor
        </Button>
        <Button
          fontSize="15px"
          border="1px"
          borderColor="gray.500"
          _hover={{ bg: "blackAlpha.400" }}
        >
          Comprobantes
        </Button>
        <Button
          fontSize="15px"
          border="1px"
          borderColor="gray.500"
          _hover={{ bg: "blackAlpha.400" }}
        >
          Registro de edicion
        </Button>
        <Container border="1px">Mucha mas info</Container>
        <Flex>
          <Box>
            <h2>Creado por: @usuario</h2>
            <h2>Ultima modificacion por: @Usuario</h2>
          </Box>
          <Spacer />
          <Box>
            <h2>Fecha: 7/11/2022</h2>
            <h2>Fecha: 15/11/2022</h2>
          </Box>
        </Flex>
      </ModalBody>
    </>
  );
};
