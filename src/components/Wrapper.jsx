import React from "react";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { BiExit } from "react-icons/bi";
import { Center, Box, Text, Flex, Button, Spacer } from "@chakra-ui/react";

export const Wrapper = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Flex border="1px" backgroundColor="gray.100" p={1} alignItems="center">
        <Text p={5}>@usuario</Text>
        <Text p={5} color="red">
          Caja: $10000
        </Text>
        <Button
          m={3}
          border="1px"
          borderColor="gray.500"
          _hover={{ bg: "blackAlpha.400" }}
        >
          Ver movimientos
        </Button>
        <Spacer />
        <Button
          border="1px"
          borderRadius="50%"
          w="10px"
          h="38px"
          _hover={{ bg: "blackAlpha.400" }}
        >
          2
        </Button>
        <Text fontSize="20px" m={2} marginRight="60px">
          Notificaciones
        </Text>
        <Button
          variant="unstyled"
          _hover={{ bg: "blackAlpha.400" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginRight="30px"
          onClick={handleLogOut}
        >
          <Text fontSize="30px" textAlign="center">
            <BiExit />
          </Text>
        </Button>
      </Flex>
      <Box m={5}>
        <Flex border="1px" backgroundColor="gray.100" p={1}>
          <Text p={5}>OBRA: @Nombre de la obra</Text>
          <Button
            m={3}
            border="1px"
            borderColor="gray.500"
            _hover={{ bg: "blackAlpha.400" }}
          >
            CAMBIAR
          </Button>
          <Button
            m={3}
            border="1px"
            borderColor="gray.500"
            _hover={{ bg: "blackAlpha.400" }}
          >
            Listado de obras
          </Button>
        </Flex>
        <Center backgroundColor="gray.100" border="1px" p={5}>
          <Button
            w={400}
            h={100}
            fontSize="25px"
            border="1px"
            borderColor="gray.500"
            m={5}
            _hover={{ bg: "blackAlpha.400" }}
          >
            Compras
          </Button>
          <Button
            w={400}
            h={100}
            fontSize="25px"
            border="1px"
            borderColor="gray.500"
            m={5}
            _hover={{ bg: "blackAlpha.400" }}
          >
            Contratistas y Servicios
          </Button>
          <Button
            w={400}
            h={100}
            fontSize="25px"
            border="1px"
            borderColor="gray.500"
            m={5}
            _hover={{ bg: "blackAlpha.400" }}
          >
            Presupuestos
          </Button>
          <Button
            w={400}
            h={100}
            fontSize="25px"
            border="1px"
            borderColor="gray.500"
            m={5}
            _hover={{ bg: "blackAlpha.400" }}
          >
            Inventario
          </Button>
        </Center>
      </Box>
    </>
  );
};
