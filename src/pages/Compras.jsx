import React, { useState, useEffect, useRef } from "react";

import { Wrapper } from "../components/Wrapper";
import { TableRow } from "../components/compras/TableRow";
import { NewItemForm } from "../components/compras/NewItemForm";
import { UserProvider } from "../components/UserProvider";

import { Box, Button, HStack, Center, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getSingleObra, listenItems } from "../firebase/firebase";

import { DownloadTableExcel } from "react-export-table-to-excel";

export const Compras = () => {
  const [state, setState] = useState(0);
  const [items, setItems] = useState();
  const [selectedObra, setSelectedObra] = useState();
  const [hasItems, setHasItems] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const tableRef = useRef(null);

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
    await getSingleObra(user.currentObra).then((obra) => {
      if (obra) {
        setSelectedObra(obra);
      }
    });
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
                  item={item}
                  user={userInfo}
                  selectedObra={selectedObra}
                />
              ))}
          </Box>

          <Box display="none">
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button> Export excel </button>
            </DownloadTableExcel>

            <table ref={tableRef}>
              <tbody>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Age</th>
                </tr>
                <tr>
                  <td>Edison</td>
                  <td>Padilla</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>Alberto</td>
                  <td>Lopez</td>
                  <td>94</td>
                </tr>
              </tbody>
            </table>
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
            <Button border="1px" fontSize="12px" mx="10px" size="md">
              Compras chicas
            </Button>
            <NewItemForm user={userInfo} selectedObra={selectedObra} />
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
