import React, { useState, useEffect, useRef } from "react";

import { Wrapper } from "../components/Wrapper";
import { NewItemForm } from "../components/compras/NewItemForm";
import { UserProvider } from "../components/UserProvider";

import { Box, Button, HStack, Center, Spinner, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getSingleObra, listenItems } from "../firebase/firebase";

import { DownloadTableExcel } from "react-export-table-to-excel";
import { TableContainer } from "../components/compras/TableContainer";

export const Compras = () => {
  const [state, setState] = useState(0);
  const [items, setItems] = useState();
  const [selectedObra, setSelectedObra] = useState();
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const tableRef = useRef(null);

  useEffect(() => {
    listenItems((items) => {
      if (items.length > 0) {
        setItems(items);
      }
    });
  }, [state]);

  const handleFilterTable = (e) => {
    setSelectedFilter(e.target.value);
  };

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
        <Box margin="auto" height="63vh">
          <Box
            backgroundColor="gray.100"
            border="1px"
            display="flex"
            height="7vh"
            alignItems="center"
            mx={5}
            pl={5}
          >
            Filtrar por:
            <Select
              size="sm"
              w="40%"
              ml="20px"
              backgroundColor="white"
              onChange={handleFilterTable}
            >
              <option value="Todos">Todos los items</option>
              <option value="Pendiente">Estado del pedido: Pendiente</option>
              <option value="Entregado">Estado del pedido: Entregado</option>
              <option value="asd">Una opción vacía</option>
            </Select>
          </Box>
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
          <TableContainer
            items={items}
            userInfo={userInfo}
            selectedObra={selectedObra}
            selectedFilter={selectedFilter}
          />

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
              Comprobantes
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
