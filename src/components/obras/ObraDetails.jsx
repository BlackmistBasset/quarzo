import React from "react";

import {
  Box,
  Text,
  Button,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalFooter,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { EliminarObra } from "./EliminarObra";

export const ObraDetails = ({
  nombreObra,
  fechaCreacion,
  jefeAsignado,
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        border="1px"
        borderColor="gray.500"
        m={1}
        onClick={onOpen}
      >
        Ver obra
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="md">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              DETALLE DE OBRA
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Box
              border="1px"
              borderColor="gray.500"
              borderRadius="5px"
              p={2}
              my={2}
            >
              <HStack py={2}>
                <Text fontWeight="bold">Nombre de la obra:</Text>
                <Text>{nombreObra}</Text>
              </HStack>

              <HStack py={1}>
                <Text fontWeight="bold">Fecha de creación:</Text>
                <Text>{fechaCreacion}</Text>
              </HStack>

              <HStack py={2}>
                <Text fontWeight="bold">Jefe de obra asignado:</Text>
                <Text>{jefeAsignado}</Text>
              </HStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Box>
              <Button size="sm" border="1px" borderColor="gray.500" m={1}>
                Editar obra
              </Button>
              <EliminarObra id={id} nombreObra={nombreObra} />
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
