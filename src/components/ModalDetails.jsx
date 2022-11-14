import React from "react";

import {
  Button,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";

export const ModalDetails = ({
  fechaSolicitado,
  nombreItem,
  um,
  cantidad,
  fechaRequerido,
  estadoPedido,
  recibido,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="link" fontSize="12px" color="blue.500" onClick={onOpen}>
        Ver detalles
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>Item: {nombreItem}</ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Text fontSize="13px" fontWeight="bold">
              DETALLES:
            </Text>
            <Box
              border="1px"
              borderColor="gray.300"
              borderRadius="5px"
              p={2}
              my={2}
            >
              <Flex justifyContent="space-between">
                <Box>
                  <HStack>
                    <Text fontWeight="bold">Unidad de medida:</Text>
                    <Text>{um}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Fecha Solicitado:</Text>
                    <Text>{fechaSolicitado}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Toma pedido:</Text>
                    <Text>@user</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Estado de la entrega:</Text>
                    <Text>Proveedor 9/3</Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack>
                    <Text fontWeight="bold">Cantidad:</Text>
                    <Text>{cantidad}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Fecha requerido:</Text>
                    <Text>{fechaRequerido}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Estado del pedido:</Text>
                    <Text>{estadoPedido}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Recibido en obra:</Text>
                    <Text>{recibido}</Text>
                  </HStack>
                </Box>
              </Flex>
            </Box>

            <Tabs
              isFitted
              variant="enclosed-colored"
              my={5}
              border="1px"
              borderTop="0px"
              borderColor="gray.300"
              borderRadius="5px"
            >
              <TabList>
                <Tab borderLeft="0px" borderRadius="5px 0px 0px 0px">
                  Referencias y consultas
                </Tab>
                <Tab>Proveedor</Tab>
                <Tab>Comprobantes</Tab>
                <Tab borderRight="0px" borderRadius="0px 5px 0px 0px">
                  Registro de Edición
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel height="100px">
                  <Flex justifyContent="space-between">
                    <Box>
                      <Text fontWeight="bold">Consultas de compras:</Text>
                      <Text color="red" paddingLeft="5px">
                        Confirmar medida
                      </Text>
                    </Box>
                    <Box>
                      <HStack>
                        <Text fontWeight="bold">Link de referencia:</Text>
                        <Button
                          variant="link"
                          fontSize="14px"
                          color="blue.500"
                          textDecoration="underline"
                        >
                          <a
                            href="http://www.google.com"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Ver Link
                          </a>
                        </Button>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Imagen de referencia:</Text>
                        <Text color="blue.500" textDecoration="underline">
                          <Button
                            variant="link"
                            fontSize="14px"
                            color="blue.500"
                          >
                            Ver Imagen
                          </Button>
                        </Text>
                      </HStack>
                    </Box>
                  </Flex>
                </TabPanel>
                <TabPanel height="100px">
                  <Flex justifyContent="space-between">
                    <Box>
                      <HStack>
                        <Text fontWeight="bold">Proveedor:</Text>
                        <Text>@nombreProveedor</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Monto factura:</Text>
                        <Text>$15.000,00</Text>
                      </HStack>
                    </Box>
                    <Box>
                      <HStack>
                        <Text fontWeight="bold">Fecha de compra:</Text>
                        <Text>4/11/22</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Forma de pago:</Text>
                        <Text>Efectivo</Text>
                      </HStack>
                    </Box>
                  </Flex>
                </TabPanel>
                <TabPanel height="100px">
                  <Flex justifyContent="space-between">
                    <Box>
                      <HStack>
                        <Text fontWeight="bold">Link de Mercado Libre:</Text>
                        <Button
                          variant="link"
                          fontSize="14px"
                          color="blue.500"
                          textDecoration="underline"
                        >
                          <a
                            href="http://www.google.com"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Ver Link
                          </a>
                        </Button>
                      </HStack>
                    </Box>
                    <Box>
                      <HStack>
                        <Text fontWeight="bold">Imagen comprobante:</Text>
                        <Text color="blue.500" textDecoration="underline">
                          <Button
                            variant="link"
                            fontSize="14px"
                            color="blue.500"
                          >
                            Ver Imagen
                          </Button>
                        </Text>
                      </HStack>
                    </Box>
                  </Flex>
                </TabPanel>
                <TabPanel height="100px">
                  <Flex direction="column">
                    <Flex justifyContent="space-between">
                      <HStack>
                        <Text fontWeight="bold">Modificado por:</Text>
                        <Text>@usuario</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Fecha:</Text>
                        <Text>3/11/22</Text>
                      </HStack>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <HStack>
                        <Text fontWeight="bold">Modificado por:</Text>
                        <Text>@usuario</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Fecha:</Text>
                        <Text>4/11/22</Text>
                      </HStack>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <HStack>
                        <Text fontWeight="bold">Modificado por:</Text>
                        <Text>@usuario</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Fecha:</Text>
                        <Text>5/11/22</Text>
                      </HStack>
                    </Flex>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Flex justifyContent="space-between">
              <Box>
                <HStack>
                  <Text fontWeight="bold">Creado por:</Text>
                  <Text>@user</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Última modificación por:</Text>
                  <Text>@user</Text>
                </HStack>
              </Box>
              <Box>
                <HStack>
                  <Text fontWeight="bold">Fecha:</Text>
                  <Text>{fechaSolicitado}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Fecha:</Text>
                  <Text>5/11/22</Text>
                </HStack>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              border="1px"
              borderColor="gray.500"
              _hover={{ bg: "blackAlpha.400" }}
              mr={3}
            >
              Editar Item
            </Button>
            <Button variant="ghost">Eliminar item</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
