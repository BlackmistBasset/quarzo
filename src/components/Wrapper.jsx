import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth, getObras } from "../firebase/firebase";

import { ObrasModal } from "./obras/ObrasModal";
import { AdministrarObras } from "./obras/AdministrarObras";
import { AdministrarCajas } from "./cajaChica/AdministrarCajas";

import { BiExit } from "react-icons/bi";
import { Center, Box, Text, Flex, Button, Spacer } from "@chakra-ui/react";
import { VerMovimientos } from "./cajaChica/VerMovimientos";

export const Wrapper = ({ userInfo, children }) => {
  const [obras, setObras] = useState([]);
  useEffect(() => {
    const getAllObras = async () => {
      await getObras().then((obras) => setObras(obras));
    };
    getAllObras();
  }, []);
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
      <Box height="30vh">
        <Flex
          border="1px"
          borderBottom="0px"
          backgroundColor="gray.100"
          p={1}
          alignItems="center"
          height="7vh"
        >
          <Text p={2} ml="20px">
            Hola, <b>{userInfo && userInfo.userName}</b>
          </Text>
          {userInfo.userType && userInfo.userType === "jefeDeObra" ? (
            <>
              <Text p={2} color="red" mx="20px">
                Caja: ${userInfo && userInfo.cajaChica}
              </Text>
              <VerMovimientos
                jefeSeleccionado={userInfo.userName}
                userType={userInfo.userType}
                jefeId={userInfo.uid}
              />
            </>
          ) : (
            ""
          )}
          {userInfo && userInfo.userType === "admin" ? (
            <AdministrarCajas userType={userInfo.userType} />
          ) : (
            ""
          )}
          <Spacer />
          <Button border="1px" borderRadius="50%" fontSize="14px" size="sm">
            2
          </Button>
          <Text fontSize="14px" m={2} marginRight="30px">
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
        <Flex
          border="1px"
          backgroundColor="gray.100"
          p={1}
          height="7vh"
          alignItems="center"
        >
          <Text ml="20px" p={2}>
            OBRA: {userInfo.currentObra}
          </Text>
          <ObrasModal userInfo={userInfo} />
          <AdministrarObras obras={obras} />
        </Flex>
        <Box m={5}>
          <Center
            backgroundColor="gray.100"
            border="1px"
            p={5}
            display="flex"
            justifyContent="space-between"
            height="10vh"
          >
            <Button
              border="1px"
              w="20%"
              borderColor="gray.500"
              _hover={{ bg: "blackAlpha.400" }}
              onClick={() => navigate("/compras")}
            >
              Compras
            </Button>
            <Button
              border="1px"
              borderColor="gray.500"
              w="20%"
              _hover={{ bg: "blackAlpha.400" }}
              onClick={() => navigate("/contratistas")}
            >
              Contratistas y Servicios
            </Button>
            <Button
              border="1px"
              borderColor="gray.500"
              w="20%"
              _hover={{ bg: "blackAlpha.400" }}
              onClick={() => navigate("/presupuestos")}
            >
              Presupuestos
            </Button>
            <Button
              border="1px"
              borderColor="gray.500"
              w="20%"
              _hover={{ bg: "blackAlpha.400" }}
              onClick={() => navigate("/inventario")}
            >
              Inventario
            </Button>
          </Center>
        </Box>
      </Box>
      {children}
    </>
  );
};
