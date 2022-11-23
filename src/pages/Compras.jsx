import React, { useState, useEffect } from "react";

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
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { listenItems } from "../firebase/firebase";

export const Compras = () => {
  const [state, setState] = useState(0);
  const [items, setItems] = useState();
  const [hasItems, setHasItems] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const { onOpen } = useDisclosure();

  useEffect(() => {
    listenItems((items) => {
      if (items.length > 0) {
        setHasItems(true);
        setItems(items);
      }
    });
  }, [state]);

  const handleUserLoggedIn = async (user) => {
    setUserInfo(user);
    setState(2);
  };

  const handleUserNotLoggedIn = () => navigate("/login");

  if (state === 2) {
    return (
      <Wrapper userInfo={userInfo}>
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
              w="10%"
              borderRight="1px"
              paddingLeft="7px"
              py={1}
            >
              TOMA PEDIDO
            </Box>
            <Box
              fontWeight="bold"
              fontSize="12px"
              color="gray.600"
              w="10%"
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
              w="15%"
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
            {hasItems ? (
              ""
            ) : (
              <Center width="100%">
                <Text p={3}>Aún no hay ítems cargados</Text>
              </Center>
            )}
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.id}
                  nombreItem={item.nombreItem}
                  um={item.um}
                  cantidad={item.cantidad}
                  fechaSolicitado={item.fechaSolicitado}
                  fechaRequerido={item.fechaRequerido}
                  tomaPedido={item.tomaPedido}
                  estadoPedido={item.estadoPedido}
                  estadoEntrega={item.estadoEntrega}
                  recibidoEnObra={item.recibidoEnObra}
                  consultasCompras={item.consultasCompras}
                  linkRef={item.linkRef}
                  proveedor={item.proveedor}
                  fechaDeCompra={item.fechaDeCompra}
                  montoFactura={item.montoFactura}
                  formaDePago={item.formaDePago}
                  linkMl={item.linkMl}
                  imgComprobante={item.imgComprobante}
                  imgRef={item.linkRef}
                  fechaCreado={item.fechaCreado}
                  autor={item.autor}
                  ediciones={item.ediciones}
                  fechaUltimaModificacion={item.fechaUltimaModificacion}
                  userUltimaModificacion={item.userUltimaModificacion}
                />
              ))}
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
            <NewItemForm user={userInfo} />
          </HStack>
        </Box>
      </Wrapper>
    );
  } else {
    return (
      <UserProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <Wrapper userInfo={userInfo}>
          <Center width="100%" height="70vh">
            <Spinner />
          </Center>
        </Wrapper>
      </UserProvider>
    );
  }
};
