import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import {
  Flex,
  Box,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Divider,
  Stack,
  HStack,
  Select,
  FormErrorMessage,
  Modal,
  ModalContent,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";

import {
  editItem,
  uploadReceiptImg,
  uploadReferenceImg,
} from "../../firebase/firebase";

import { parseDate, parseFechaDeCompraEdit } from "../../utils/utils";

const schema = Yup.object({
  nombreItem: Yup.string().required("Campo requerido"),
  um: Yup.string().required("Campo requerido"),
  cantidad: Yup.number().required("Campo requerido"),
  fechaSolicitado: Yup.date().required("Campo requerido"),
  fechaRequerido: Yup.date().required("campo requerido"),
  tomaPedido: Yup.string(),
  estadoPedido: Yup.string(),
  estadoEntrega: Yup.string(),
  recibidoEnObra: Yup.string(),
  consultasCompras: Yup.string(),
  linkRef: Yup.string(),
  proveedor: Yup.string(),
  fechaDeCompra: Yup.string(),
  montoFactura: Yup.string(),
  formaDePago: Yup.string(),
  linkMl: Yup.string(),
});

export const EditItem = ({ selectedItem, user, selectedObra }) => {
  const {
    nombreItem,
    fechaSolicitado,
    um,
    cantidad,
    fechaRequerido,
    estadoPedido,
    recibidoEnObra,
    tomaPedido,
    estadoEntrega,
    consultasCompras,
    linkRef,
    proveedor,
    fechaDeCompra,
    montoFactura,
    formaDePago,
    linkMl,
  } = selectedItem;

  const { isOpen, onOpen, onClose } = useDisclosure();
  let [nombreDelItem, setNombreDelItem] = useState();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = watch((value) => setNombreDelItem(value.nombreItem));
    return () => subscription.unsubscribe();
  }, [watch]);

  //Cargar values por default al form
  useEffect(() => {
    setValue("nombreItem", nombreItem);
    setValue("um", um);
    setValue("cantidad", cantidad);
    setValue("fechaSolicitado", fechaSolicitado.split("/").reverse().join("-"));
    setValue("fechaRequerido", fechaRequerido.split("/").reverse().join("-"));
    setValue("tomaPedido", tomaPedido);
    setValue("estadoPedido", estadoPedido);
    setValue("estadoEntrega", estadoEntrega);
    setValue("recibidoEnObra", recibidoEnObra);
    setValue("consultasCompras", consultasCompras);
    setValue("linkRef", linkRef);
    setValue("proveedor", proveedor);
    setValue("fechaDeCompra", fechaDeCompra.split("/").reverse().join("-"));
    setValue("montoFactura", montoFactura);
    setValue("formaDePago", formaDePago);
    setValue("linkMl", linkMl);
    // eslint-disable-next-line
  }, []);

  const itemUpdate = async (newItemInfo) => {
    if (newItemInfo) {
      let parsedItem = { ...selectedItem };
      parsedItem.nombreItem = newItemInfo.nombreItem;
      parsedItem.um = newItemInfo.um;
      parsedItem.cantidad = newItemInfo.cantidad;
      parsedItem.fechaSolicitado = parseDate(newItemInfo.fechaSolicitado);
      parsedItem.fechaRequerido = parseDate(newItemInfo.fechaRequerido);
      parsedItem.tomaPedido = newItemInfo.tomaPedido;
      parsedItem.estadoPedido = newItemInfo.estadoPedido;
      parsedItem.estadoEntrega = newItemInfo.estadoEntrega;
      parsedItem.recibidoEnObra = newItemInfo.recibidoEnObra;
      parsedItem.consultasCompras = newItemInfo.consultasCompras;
      parsedItem.linkRef = newItemInfo.linkRef;
      parsedItem.proveedor = newItemInfo.proveedor;
      if (parsedItem.fechaDeCompra && newItemInfo.fechaDeCompra) {
        let getDate = new Date(newItemInfo.fechaDeCompra);
        parsedItem.fechaDeCompra = parseFechaDeCompraEdit(getDate);
      }
      if (parsedItem.montoFactura && newItemInfo.montoFactura) {
        parsedItem.montoFactura = parseInt(newItemInfo.montoFactura);
      }
      parsedItem.fechaUltimaModificacion = parseDate(new Date());
      parsedItem.userUltimaModificacion = user.firstName;

      await editItem(selectedObra.id, parsedItem);

      onClose();
    }
  };

  const handleChangeFile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async () => {
        const imgData = fileReader.result;
        if (e.target.name === "img-ref") {
          await uploadReferenceImg(selectedObra.id, nombreDelItem, imgData);
        }
        if (e.target.name === "img-rec") {
          await uploadReceiptImg(selectedObra.id, nombreDelItem, imgData);
        }
      };
    }
  };

  return (
    <>
      <Button
        border="1px"
        borderColor="gray.500"
        _hover={{ bg: "blackAlpha.400" }}
        mr={3}
        onClick={onOpen}
      >
        Editar Item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent autoFocus={true} py={4}>
          <Text fontWeight="bold" ml={4} pb={2}>
            EDITAR ÍTEM
          </Text>
          <ModalCloseButton m={2} pb={2} />
          <Stack
            as="form"
            onSubmit={handleSubmit(itemUpdate)}
            height="80vh"
            overflow="auto"
            px={4}
          >
            <Divider backgroundColor="gray.500" />
            <FormControl isInvalid={errors.nombreItem}>
              <FormLabel fontWeight="bold" fontSize="12px">
                NOMBRE DEL ÍTEM:
              </FormLabel>
              <Input
                type="text"
                size="sm"
                borderColor="gray.500"
                {...register("nombreItem")}
                mb={1}
              ></Input>
              <FormErrorMessage>{errors.nombreItem?.message}</FormErrorMessage>
            </FormControl>
            <Text fontSize="12px" fontWeight="bold">
              DETALLES:
            </Text>
            <Box
              border="1px"
              borderColor="gray.300"
              borderRadius="5px"
              p={2}
              my={4}
              paddingBottom="15px"
            >
              <HStack>
                <FormControl px={1} isInvalid={errors.um}>
                  <FormLabel>Unidad de medida:</FormLabel>
                  <Select
                    placeholder="Seleccione una unidad"
                    borderColor="gray.500"
                    size="sm"
                    {...register("um")}
                  >
                    <option value="unidad">Unidad</option>
                    <option value="kilo">Kilo</option>
                    <option value="gramos">Gramos</option>
                    <option value="rollo">Rollo</option>
                    <option value="bolsa">Bolsa</option>
                    <option value="bolson">bolsón</option>
                  </Select>
                  <FormErrorMessage>{errors.um?.message}</FormErrorMessage>
                </FormControl>
                <FormControl px={1} isInvalid={errors.cantidad}>
                  <FormLabel>Cantidad:</FormLabel>
                  <Input
                    size="sm"
                    borderColor="gray.500"
                    type="number"
                    mb={1}
                    {...register("cantidad")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.cantidad?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl isInvalid={errors.fechaSolicitado} px={1}>
                  <FormLabel>Fecha Solicitado:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="date"
                    size="sm"
                    mb={1}
                    {...register("fechaSolicitado")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.fechaSolicitado?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.fechaRequerido} px={1}>
                  <FormLabel>Fecha Requerido:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="date"
                    size="sm"
                    mb={1}
                    {...register("fechaRequerido")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.fechaRequerido?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl px={1} isInvalid={errors.tomaPedido}>
                  <FormLabel>Toma pedido:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="text"
                    size="sm"
                    mb={1}
                    {...register("tomaPedido")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.tomaPedido?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl px={1} isInvalid={errors.estadoPedido}>
                  <FormLabel>Estado del pedido:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="text"
                    size="sm"
                    mb={1}
                    {...register("estadoPedido")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.estadoPedido?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl isInvalid={errors.estadoEntrega} px={1}>
                  <FormLabel>Estado de la entrega:</FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    borderColor="gray.500"
                    mb={1}
                    {...register("estadoEntrega")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.estadoEntrega?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl px={1} isInvalid={errors.recibidoEnObra}>
                  <FormLabel>Recibido en obra:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="text"
                    size="sm"
                    mb={1}
                    {...register("recibidoEnObra")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.recibidoEnObra?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
            </Box>
            <Text fontSize="12px" fontWeight="bold">
              CONSULTAS Y REFERENCIAS:
            </Text>
            <Box
              border="1px"
              borderColor="gray.300"
              borderRadius="5px"
              p={2}
              my={4}
              paddingBottom="15px"
            >
              <FormControl px={1} isInvalid={errors.consultasCompras}>
                <FormLabel>Consultas Compras:</FormLabel>
                <Textarea
                  borderColor="gray.500"
                  type="text"
                  size="sm"
                  mb={1}
                  {...register("consultasCompras")}
                ></Textarea>
                <FormErrorMessage>
                  {errors.consultasCompras?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl px={1} isInvalid={errors.linkRef}>
                <FormLabel>Link de referencia:</FormLabel>
                <Input
                  borderColor="gray.500"
                  type="text"
                  size="sm"
                  mb={1}
                  {...register("linkRef")}
                ></Input>
                <FormErrorMessage>{errors.linkRef?.message}</FormErrorMessage>
              </FormControl>
              <FormControl px={1} isInvalid={errors.imgRef}>
                <FormLabel>Imagen de referencia:</FormLabel>
                <Input
                  borderColor="gray.500"
                  type="file"
                  name="img-ref"
                  size="sm"
                  pt="2px"
                  mb={1}
                  onChange={handleChangeFile}
                ></Input>
                <FormErrorMessage>{errors.imgRef?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Text fontSize="12px" fontWeight="bold">
              PROVEEDOR:
            </Text>
            <Box
              border="1px"
              borderColor="gray.300"
              borderRadius="5px"
              p={2}
              my={4}
              paddingBottom="15px"
            >
              <HStack>
                <FormControl isInvalid={errors.proveedor} px={1}>
                  <FormLabel>Nombre del proveedor:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="text"
                    size="sm"
                    mb={1}
                    {...register("proveedor")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.proveedor?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.fechaDeCompra} px={1}>
                  <FormLabel>Fecha de compra:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="date"
                    size="sm"
                    mb={1}
                    {...register("fechaDeCompra")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.fechaDeCompra?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl isInvalid={errors.montoFactura} px={1}>
                  <FormLabel>Monto factura:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="number"
                    size="sm"
                    mb={1}
                    {...register("montoFactura")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.montoFactura?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.formaDePago} px={1}>
                  <FormLabel>Forma de pago:</FormLabel>
                  <Input
                    borderColor="gray.500"
                    type="text"
                    size="sm"
                    mb={1}
                    {...register("formaDePago")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.formaDePago?.message}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
            </Box>
            <Text fontSize="12px" fontWeight="bold">
              COMPROBANTES:
            </Text>
            <Box
              border="1px"
              borderColor="gray.300"
              borderRadius="5px"
              p={2}
              my={4}
              paddingBottom="15px"
            >
              <FormControl px={1} isInvalid={errors.linkMl}>
                <FormLabel>Link de mercadoLibre:</FormLabel>
                <Input
                  borderColor="gray.500"
                  type="text"
                  size="sm"
                  mb={1}
                  {...register("linkMl")}
                ></Input>
                <FormErrorMessage>{errors.linkMl?.message}</FormErrorMessage>
              </FormControl>
              <FormControl px={1} isInvalid={errors.imgComprobante}>
                <FormLabel>Imagen comprobante:</FormLabel>
                <Input
                  borderColor="gray.500"
                  type="file"
                  size="sm"
                  name="img-rec"
                  pt="2px"
                  mb={1}
                  onChange={handleChangeFile}
                ></Input>
                <FormErrorMessage>
                  {errors.imgComprobante?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                border="1px"
                borderColor="gray.500"
                _hover={{ bg: "blackAlpha.400" }}
                m={2}
              >
                Aceptar
              </Button>
              <Button onClick={onClose} variant="ghost" size="md" m={2}>
                Cancelar
              </Button>
            </Flex>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};
