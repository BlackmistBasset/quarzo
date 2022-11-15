import React, { useState } from "react";

import { Wrapper } from "../components/Wrapper";
import { TableRow } from "../components/TableRow";
import { NewItemForm } from "../components/NewItemForm";
import { UserProvider } from "../components/UserProvider";

import {
  Box,
  Button,
  useDisclosure,
  HStack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Compras = () => {
  const [state, setState] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const { onOpen } = useDisclosure();

  const handleUserLoggedIn = async (user) => {
    setUserInfo(user);
    setState(2);
  };
  const handleUserNotLoggedIn = () => navigate("/login");

  if (state === 2) {
    return (
      <>
        <Wrapper userInfo={userInfo} />
        <Box margin="auto" height="70vh">
          <HStack backgroundColor="gray.100" mx={5} p={1} border="1px">
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="10%"
              borderRight="1px"
              paddingLeft="7px"
              py={1}
            >
              FECHA SOLICITADO
            </Box>
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="25%"
              borderRight="1px"
              paddingLeft="7px"
              py={1}
            >
              NOMBRE DEL ITEM
            </Box>
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="7%"
              paddingLeft="7px"
              borderRight="1px"
              py={1}
            >
              UM
            </Box>
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="7%"
              borderRight="1px"
              paddingLeft="7px"
              py={1}
            >
              CANTIDAD
            </Box>
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="15%"
              paddingLeft="7px"
              borderRight="1px"
              py={1}
            >
              FECHA REQUERIDO
            </Box>
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="20%"
              borderRight="1px"
              paddingLeft="7px"
              py={1}
            >
              ESTADO DEL PEDIDO
            </Box>
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="7%"
              borderRight="1px"
              paddingLeft="7px"
              py={1}
            >
              RECIBIDO
            </Box>
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="12%"
              paddingLeft="7px"
              py={1}
            >
              DETALLES
            </Box>
          </HStack>
          <Box height="75%" overflowY="scroll">
            <TableRow
              fechaSolicitado="15/11/22"
              nombreItem="Jerbito"
              um="unidad"
              cantidad="1000"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/11/22"
              nombreItem="jerbito"
              um="unidad"
              cantidad="1000"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="1/11/22"
              nombreItem="pepe"
              um="unidad"
              cantidad="12345"
              fechaRequerido="20/11/2050"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/36/22"
              nombreItem="lauti"
              um="unidad"
              cantidad="1"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/4/22"
              nombreItem="marcos"
              um="unidad"
              cantidad="50"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/11/22"
              nombreItem="Jerbito"
              um="unidad"
              cantidad="1000"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/11/22"
              nombreItem="jerbito"
              um="unidad"
              cantidad="1000"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="1/11/22"
              nombreItem="pepe"
              um="unidad"
              cantidad="12345"
              fechaRequerido="20/11/2050"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/36/22"
              nombreItem="lauti"
              um="unidad"
              cantidad="1"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/4/22"
              nombreItem="marcos"
              um="unidad"
              cantidad="50"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/11/22"
              nombreItem="Jerbito"
              um="unidad"
              cantidad="1000"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/11/22"
              nombreItem="jerbito"
              um="unidad"
              cantidad="1000"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="1/11/22"
              nombreItem="pepe"
              um="unidad"
              cantidad="12345"
              fechaRequerido="20/11/2050"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/36/22"
              nombreItem="lauti"
              um="unidad"
              cantidad="1"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
            <TableRow
              fechaSolicitado="15/4/22"
              nombreItem="marcos"
              um="unidad"
              cantidad="50"
              fechaRequerido="20/11/22"
              estadoPedido="Pendiente"
              recibido="Sí"
            />
          </Box>
          <HStack
            backgroundColor="gray.100"
            mx={5}
            mt="-1px"
            height="70px"
            border="1px"
            pr="15px"
            justifyContent="flex-end"
          >
            <Button
              onClick={onOpen}
              border="1px"
              fontSize="12px"
              mx="10px"
              size="md"
            >
              Compras chicas
            </Button>
            <NewItemForm />
          </HStack>
        </Box>
      </>
    );
  } else {
    return (
      <UserProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <Center width="100%" height="100vh">
          <Spinner />
        </Center>
      </UserProvider>
    );
  }
};
