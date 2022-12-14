import React from "react";

import { saveAs } from "file-saver";

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
  Image,
} from "@chakra-ui/react";

export const ViewImgModal = ({ modalTitle, imgUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDownloadImg = () => {
    saveAs(imgUrl, "imagen");
  };
  return (
    <>
      <Button variant="link" fontSize="14px" color="blue.500" onClick={onOpen}>
        Ver Imagen
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              {modalTitle}
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Image
              boxSize="400px"
              objectFit="contain"
              src={imgUrl}
              alt="Imagen de referencia"
            ></Image>
          </ModalBody>
          <ModalFooter>
            <Box>
              <Button
                size="sm"
                border="1px"
                borderColor="gray.500"
                m={1}
                onClick={handleDownloadImg}
              >
                Descargar
              </Button>
              <Button
                size="sm"
                border="1px"
                borderColor="gray.500"
                m={1}
                onClick={onClose}
              >
                Cerrar
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
