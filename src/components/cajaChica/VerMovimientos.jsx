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
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";

import { AñadirMovimientoForm } from "../../components/cajaChica/AñadirMovimientoForm";

import { getOneJefeCaja, getOneJefeMovimientos } from "../../firebase/firebase";

export const VerMovimientos = ({ jefeSeleccionado, userType, jefeId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movimientos, setMovimientos] = useState();
  const [cajaChica, setCajaChica] = useState();
  useEffect(() => {
    const getMovimientos = async () => {
      await getOneJefeMovimientos(jefeSeleccionado).then((arrMovimientos) => {
        setMovimientos(arrMovimientos);
      });
      await getOneJefeCaja(jefeSeleccionado).then((data) => {
        setCajaChica(data);
      });
    };
    getMovimientos();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Button
        size="sm"
        border="1px"
        borderColor="gray.500"
        fontSize="12px"
        fontWeight="bold"
        onClick={onOpen}
      >
        Ver Movimientos
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              MOVIMIENTOS
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            {userType && userType === "admin" ? (
              <Text>
                Mostrando los movimientos del usuario: {jefeSeleccionado}
              </Text>
            ) : (
              ""
            )}
            <Box
              border="1px"
              borderColor="gray.500"
              borderRadius="5px"
              p={2}
              my={4}
              height="300px"
              overflow="auto"
            >
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th width="50px">Fecha</Th>
                      <Th>Concepto</Th>
                      <Th isNumeric width="50px">
                        Monto
                      </Th>
                      <Th isNumeric width="50px">
                        Saldo
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {movimientos &&
                      movimientos.map((movimiento, index) => {
                        return (
                          <Tr key={`${movimiento.concepto}-${index}`}>
                            <Td>{movimiento.fechaMovimiento}</Td>
                            <Td>{movimiento.concepto}</Td>
                            <Td>${movimiento.montoMovimiento}</Td>
                            <Td>${movimiento.saldoCaja}</Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Text ml={2}>
              <b>Saldo actual: </b>${cajaChica}
            </Text>
          </ModalBody>
          <ModalFooter>
            {userType && userType === "jefeDeObra" ? (
              <AñadirMovimientoForm cajaChica={cajaChica} jefeId={jefeId} />
            ) : (
              ""
            )}
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              m={2}
              fontSize="12px"
              fontWeight="bold"
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
