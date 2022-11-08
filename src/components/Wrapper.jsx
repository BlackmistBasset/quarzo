
import React from 'react'
import { useNavigate } from 'react-router-dom';

import {
    Center,
    Box,
    Text,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    ButtonGroup,
    Stack,
    InputGroup,
    FormErrorMessage,
    InputRightElement,
    Circle,
    Spacer,
} from "@chakra-ui/react";

export const Wrapper = () => {
    
const navigate = useNavigate();
  
  return (
    <>
        <Flex border="1px" backgroundColor = "gray.100"  p={1}>
            <Text p={5}>@usuario</Text>
            <Text p={5} color="red">Caja: $10000</Text>
            <Button m={3} border="1px" borderColor="gray.500" _hover={{ bg: "blackAlpha.400" }}>Ver movimientos</Button>
            <Spacer />
            <Button border="1px" m={1} _hover={{ bg: "blackAlpha.400" }}>2</Button>
            <Text fontSize="20px" m={2}>Notificaciones</Text>
        </Flex>
        <Box m={5}>
            <Flex border="1px" backgroundColor = "gray.100" p={1}>
                <Text p={5}>OBRA: @Nombre de la obra</Text>
                <Button m={3} border="1px" borderColor="gray.500" _hover={{ bg: "blackAlpha.400" }}>CAMBIAR</Button>
                <Button m={3} border="1px" borderColor="gray.500" _hover={{ bg: "blackAlpha.400" }}>Listado de obras</Button>
            </Flex>
            <Center backgroundColor = "gray.100"  border="1px" p={5}> 
                <Button 
                    w={400} 
                    h={100} 
                    fontSize="25px" 
                    border="1px" 
                    borderColor="gray.500" 
                    m={5} 
                    _hover={{ bg: "blackAlpha.400" }} 
                    onClick={() => navigate("/compras")}>Compras</Button> 
                <Button 
                    w={400}
                    h={100} 
                    fontSize="25px" 
                    border="1px" 
                    borderColor="gray.500" 
                    m={5} 
                    _hover={{ bg: "blackAlpha.400" }} 
                    onClick={() => navigate("/contratistas")}>Contratistas y Servicios</Button>
                <Button 
                    w={400} 
                    h={100} 
                    fontSize="25px" 
                    border="1px" 
                    borderColor="gray.500" 
                    m={5} 
                    _hover={{ bg: "blackAlpha.400" }} 
                    onClick={() => navigate("/presupuestos")}>Presupuestos</Button>
                <Button 
                    w={400} 
                    h={100} 
                    fontSize="25px" 
                    border="1px" 
                    borderColor="gray.500" 
                    m={5} 
                    _hover={{ bg: "blackAlpha.400" }} 
                    onClick={() => navigate("/inventario")}>Inventario</Button>
            </Center>
        </Box>
    </>
  )
}
