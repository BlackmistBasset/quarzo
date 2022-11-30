import React, { useState, useEffect } from "react";

import { Obra } from "./Obra";
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
  useDisclosure,
} from "@chakra-ui/react";
import { getObras } from "../../firebase/firebase";

export const ObrasModal = ({ userInfo }) => {
  const [obras, setObras] = useState([]);
  useEffect(() => {
    const getEveryObra = async () => {
      const resObras = await getObras();
      setObras([...resObras]);
    };
    getEveryObra();
    // eslint-disable-next-line
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        border="1px"
        borderColor="gray.500"
        _hover={{ bg: "blackAlpha.400" }}
        ml="20px"
        onClick={onOpen}
      >
        Cambiar de obra
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              CAMBIAR DE OBRA
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
                {obras.length > 0 &&
                  obras.map((obra) => (
                    <Obra
                      nombreObra={obra.nombreObra}
                      key={obra.nombreObra}
                      userInfo={userInfo}
                      closeModal={onClose}
                    />
                  ))}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
