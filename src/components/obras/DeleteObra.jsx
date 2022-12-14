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
} from "@chakra-ui/react";
import { deleteObra } from "../../firebase/firebase";

export const DeleteObra = ({ id, nombreObra }) => {
  const handleDeleteObra = async (idObra) => {
    await deleteObra(idObra);
    window.location.reload();
  };

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
        Eliminar Obra
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="md">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              ELIMINAR OBRA
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Text>
              Estás a punto de eliminar la obra {nombreObra}. Ésta acción no se
              puede revertir.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Box>
              <Button
                size="sm"
                border="1px"
                borderColor="gray.500"
                m={1}
                onClick={() => handleDeleteObra(id)}
              >
                Confirmar
              </Button>
              <Button
                size="sm"
                border="1px"
                borderColor="gray.500"
                m={1}
                onClick={onClose}
              >
                Cancelar
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
