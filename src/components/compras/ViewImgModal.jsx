import React, { useState, useEffect } from "react";

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
  Center,
} from "@chakra-ui/react";

import { getReferenceImg, getReceiptImg } from "../../firebase/firebase";

export const ViewImgModal = ({
  modalTitle,
  perteneceAObra,
  nombreItem,
  imgType,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgUrl, setImgUrl] = useState();
  useEffect(() => {
    const getImgUrls = async () => {
      if (imgType === "imgRef") {
        await getReferenceImg(perteneceAObra, nombreItem).then((url) => {
          if (url) {
            setImgUrl(url);
          } else {
            setImgUrl(
              "https://firebasestorage.googleapis.com/v0/b/quarzo-bbf31.appspot.com/o/images%2Fsample-img.webp?alt=media&token=06a7bdcc-6c38-4680-a3c5-1e22a2977c3b"
            );
          }
        });
      } else if (imgType === "imgRec") {
        await getReceiptImg(perteneceAObra, nombreItem).then((url) => {
          if (url) {
            setImgUrl(url);
          } else {
            setImgUrl(
              "https://firebasestorage.googleapis.com/v0/b/quarzo-bbf31.appspot.com/o/images%2Fsample-img.webp?alt=media&token=06a7bdcc-6c38-4680-a3c5-1e22a2977c3b"
            );
          }
        });
      }
    };
    getImgUrls();
    // eslint-disable-next-line
  }, []);
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
            <Center>
              <Image
                boxSize="400px"
                objectFit="contain"
                src={imgUrl}
                alt="Imagen de referencia"
              ></Image>
            </Center>
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
