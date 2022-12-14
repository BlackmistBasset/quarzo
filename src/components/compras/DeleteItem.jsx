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

import { removeItem } from "../../firebase/firebase";

export const DeleteItem = ({ nombreItem, perteneceAObra }) => {
  const handleDeleteItem = async () => {
    await removeItem(nombreItem, perteneceAObra);
    window.location.reload();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        Eliminar item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="sm">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              ELIMINAR ITEM
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Text>
              Estás a punto de eliminar el ítem {nombreItem}. Ésta acción no se
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
                onClick={handleDeleteItem}
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
