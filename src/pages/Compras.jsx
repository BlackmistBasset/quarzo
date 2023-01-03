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
            <table ref={tableRef}>
              <thead>
                <tr>
                  <td>Autor</td>
                  <td>Cantidad</td>
                  <td>ConsultasCompras</td>
                  <td>Ediciones</td>
                  <td>EstadoEntrega</td>
                  <td>EstadoPedido</td>
                  <td>FechaCreado</td>
                  <td>FechaDeCompra</td>
                  <td>FechaRequerido</td>
                  <td>FechaSolicitado</td>
                  <td>FechaUltimaModificacion</td>
                  <td>FormaDePago</td>
                  <td>ID</td>
                  <td>ImgRecUrl</td>
                  <td>ImgRefUrl</td>
                  <td>LinkMl</td>
                  <td>LinkRef</td>
                  <td>MontoFactura</td>
                  <td>NombreItem</td>
                  <td>PerteneceAObra</td>
                  <td>Proveedor</td>
                  <td>RecibidoEnObra</td>
                  <td>TomaPedido</td>
                  <td>UM</td>
                  <td>UserUltimaModificacion</td>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.map(
                    ({
                      autor,
                      cantidad,
                      consultasCompras,
                      ediciones,
                      estadoEntrega,
                      estadoPedido,
                      fechaCreado,
                      fechaDeCompra,
                      fechaRequerido,
                      fechaSolicitado,
                      fechaUltimaModificacion,
                      formaDePago,
                      id,
                      imgRecUrl,
                      imgRefUrl,
                      linkMl,
                      linkRef,
                      montoFactura,
                      nombreItem,
                      perteneceAObra,
                      proveedor,
                      recibidoEnObra,
                      tomaPedido,
                      um,
                      userUltimaModificacion,
                    }) => (
                      <tr key={id}>
                        <td>{autor}</td>
                        <td>{cantidad}</td>
                        <td>{consultasCompras}</td>
                        <td>{ediciones}</td>
                        <td>{estadoEntrega}</td>
                        <td>{estadoPedido}</td>
                        <td>{fechaCreado}</td>
                        <td>{fechaDeCompra}</td>
                        <td>{fechaRequerido}</td>
                        <td>{fechaSolicitado}</td>
                        <td>{fechaUltimaModificacion}</td>
                        <td>{formaDePago}</td>
                        <td>{id}</td>
                        <td>{imgRecUrl}</td>
                        <td>{imgRefUrl}</td>
                        <td>{linkMl}</td>
                        <td>{linkRef}</td>
                        <td>{montoFactura}</td>
                        <td>{nombreItem}</td>
                        <td>{perteneceAObra}</td>
                        <td>{proveedor}</td>
                        <td>{recibidoEnObra}</td>
                        <td>{tomaPedido}</td>
                        <td>{um}</td>
                        <td>{userUltimaModificacion}</td>
                      </tr>
                    )
                  )}
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
            <Button border="1px" fontSize="12px" size="md">
              <DownloadTableExcel
                filename="ITEMS"
                sheet="ITEMS"
                currentTableRef={tableRef.current}
              >
                Exportar Tabla
              </DownloadTableExcel>
            </Button>
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
