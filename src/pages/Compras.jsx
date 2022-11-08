import React from 'react'

import { Wrapper } from '../components/Wrapper'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
export const Compras = () => {
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
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>07/11/2022</Td>
              <Td>Tornillos</Td>
              <Td>1</Td>
              <Td>250</Td>
              <Td>15/11/2022</Td>
              <Td>Pendiente de compra</Td>
              <Td> N/A</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}