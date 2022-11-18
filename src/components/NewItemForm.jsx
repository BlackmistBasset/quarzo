import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  FormErrorMessage,
  Modal,
  ModalContent,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";
import { addNewItem } from "../firebase/firebase";

const schema = Yup.object({
  nombreItem: Yup.string().required("Campo requerido"),
  fechaSolicitado: Yup.date().required("Campo requerido"),
  fechaRequerido: Yup.date().required("campo requerido"),
  um: Yup.string().required("Campo requerido"),
  cantidad: Yup.number().required("Campo requerido"),
  estadoPedido: Yup.string(),
  recibido: Yup.string(),
});

export const NewItemForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const itemUpload = async (item) => {
    if (item) {
      let parsedItem = { ...item };
      parsedItem.fechaRequerido =
        parsedItem.fechaRequerido.toLocaleDateString();
      parsedItem.fechaSolicitado =
        parsedItem.fechaSolicitado.toLocaleDateString();
      parsedItem.id = uuidv4();
      console.log(parsedItem);
      await addNewItem(parsedItem);
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Button onClick={onOpen} border="1px" fontSize="12px" mx="10px" size="md">
        Añadir ítem
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="2xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={5}>
          <Stack as="form" onSubmit={handleSubmit(itemUpload)}>
            <FormControl isInvalid={errors.nombreItem}>
              <FormLabel>Nombre del ítem:</FormLabel>
              <Input
                type="text"
                borderColor="gray.500"
                {...register("nombreItem")}
              ></Input>
              <FormErrorMessage>{errors.nombreItem?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.fechaSolicitado}>
              <FormLabel>Fecha Solicitado:</FormLabel>
              <Input
                borderColor="gray.500"
                type="date"
                {...register("fechaSolicitado")}
              ></Input>
              <FormErrorMessage>
                {errors.fechaSolicitado?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.fechaRequerido}>
              <FormLabel>Fecha Requerido:</FormLabel>
              <Input
                borderColor="gray.500"
                type="date"
                {...register("fechaRequerido")}
              ></Input>
              <FormErrorMessage>
                {errors.fechaRequerido?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.um}>
              <FormLabel>Unidad de medida:</FormLabel>
              <Input
                borderColor="gray.500"
                type="text"
                {...register("um")}
              ></Input>
              <FormErrorMessage>{errors.um?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.cantidad}>
              <FormLabel>Cantidad:</FormLabel>
              <Input
                borderColor="gray.500"
                type="number"
                {...register("cantidad")}
              ></Input>
              <FormErrorMessage>{errors.cantidad?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.estadoPedido}>
              <FormLabel>Estado del pedido:</FormLabel>
              <Input
                borderColor="gray.500"
                type="text"
                {...register("estadoPedido")}
              ></Input>
              <FormErrorMessage>
                {errors.estadoPedido?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.recibido}>
              <FormLabel>Recibido:</FormLabel>
              <Input
                borderColor="gray.500"
                type="text"
                {...register("recibido")}
              ></Input>
              <FormErrorMessage>{errors.recibido?.message}</FormErrorMessage>
            </FormControl>
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
