import React from "react";

import { AdminObra } from "./AdminObra";
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
import { NewObraForm } from "./NewObraForm";

export const AdministrarObras = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        border="1px"
        borderColor="gray.500"
        _hover={{ bg: "blackAlpha.400" }}
        ml="20px"
        fontSize="12px"
        fontWeight="bold"
        onClick={onOpen}
      >
        ADMINISTRAR OBRAS
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              ADMINISTRAR OBRAS
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Box
              border="1px"
              borderColor="gray.500"
              borderRadius="5px"
              p={1}
              my={2}
            >
              <Box height="300px" overflow="auto">
                <AdminObra />
                <AdminObra />
                <AdminObra />
                <AdminObra />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <NewObraForm />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
