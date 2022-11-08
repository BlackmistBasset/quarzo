import React from 'react'

import { Wrapper } from '../components/Wrapper';
import { ModalDetails } from '../components/ModalDetails';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Button,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
} from '@chakra-ui/react';
export const Compras = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Wrapper />
      <TableContainer border="1px" backgroundColor = "gray.100" p={1} m={5} whiteSpace="wrap">   
        <Table variant='simple' colorScheme='gray.500'>
          <TableCaption>Compras</TableCaption>
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>Nombre del item</Th>
              <Th>UM</Th>
              <Th>Cantidad</Th>
              <Th>Fecha de necesidad</Th>
              <Th>Estado del pedido</Th>
              <Th>Recibido</Th>
              <Th>Detalles</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td name="fecha">07/11/2022</Td>
              <Td name="NombreItem">Tornillos</Td>
              <Td>1</Td>
              <Td>250</Td>
              <Td>15/11/2022</Td>
              <Td>Pendiente de compra</Td>
              <Td>OK</Td> 
              <Td><Button border="1px" m={1} onClick={onOpen}>Ver detalles</Button></Td>
              <Modal  isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl">
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'/>
                  <ModalContent autoFocus={true}>
                    <ModalDetails />
                    <ModalFooter>
                      <Button colorScheme='blue' mr={3}>
                        Editar Item
                      </Button>
                      <Button variant='ghost'>Eliminar item</Button>
                    </ModalFooter>
                  </ModalContent>
              </Modal>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}