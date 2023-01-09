import React, { useState, useEffect } from "react";

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
  Stack,
} from "@chakra-ui/react";
import { getJefesDeObraAndCajas } from "../../firebase/firebase";

import { VerMovimientos } from "./VerMovimientos";
import { AñadirSaldo } from "./AñadirSaldo";

export const AdministrarCajas = ({ userType }) => {
  const [jefesYCajas, setJefesYCajas] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await getJefesDeObraAndCajas().then((data) => {
        setJefesYCajas(data);
      });
    };
    getData();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        m={2}
        size="sm"
        border="1px"
        ml="20px"
        borderColor="gray.500"
        fontSize="12px"
        fontWeight="bold"
        onClick={onOpen}
      >
        ADMINISTRAR CAJAS
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="md">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              ADMINISTRAR CAJAS
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
              height="300px"
              overflow="auto"
            >
              {jefesYCajas &&
                jefesYCajas.map((jefe) => {
                  return (
                    <HStack
                      key={jefe.jefeDeObra}
                      justifyContent="space-between"
                      borderBottom="1px"
                      borderColor="gray.500"
                      p={5}
                    >
                      <Box>
                        <Text>
                          <b>Jefe de Obra:</b> {jefe.jefeDeObra}
                        </Text>
                        <Text>
                          <b>Monto caja chica:</b> ${jefe.montoCajaChica}
                        </Text>
                      </Box>
                      <Stack>
                        <VerMovimientos
                          jefeSeleccionado={jefe.jefeDeObra}
                          userType={userType}
                        />
                        <AñadirSaldo
                          jefeSeleccionado={jefe.jefeDeObra}
                          jefeId={jefe.jefeId}
                          montoCajaChica={jefe.montoCajaChica}
                        />
                      </Stack>
                    </HStack>
                  );
                })}
            </Box>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
