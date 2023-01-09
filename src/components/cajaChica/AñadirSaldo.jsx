import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import {
  Text,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Flex,
  Input,
  FormErrorMessage,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

import { añadirSaldoAJefe } from "../../firebase/firebase";

const schema = Yup.object({
  montoCaja: Yup.number().required("Ingrese un monto"),
});

export const AñadirSaldo = ({ jefeSeleccionado, jefeId, montoCajaChica }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAñadirSaldo = async (monto) => {
    console.log(monto.montoCaja, jefeId);
    const newMonto = monto.montoCaja + montoCajaChica;
    await añadirSaldoAJefe(jefeId, newMonto);
    window.location.reload();
  };
  return (
    <>
      <Button
        size="sm"
        border="1px"
        borderColor="gray.500"
        fontSize="12px"
        fontWeight="bold"
        onClick={onOpen}
      >
        Añadir saldo
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="md">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              AÑADIR SALDO
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Stack
              as="form"
              onSubmit={handleSubmit(handleAñadirSaldo)}
              border="1px"
              borderColor="gray.500"
              borderRadius="5px"
              p={2}
              my={2}
            >
              <FormControl isInvalid={errors.montoCaja}>
                <FormLabel>
                  Añadir saldo a la caja de {jefeSeleccionado}:
                </FormLabel>
                <Input
                  type="number"
                  borderColor="gray.500"
                  {...register("montoCaja")}
                ></Input>
                <FormErrorMessage>{errors.montoCaja?.message}</FormErrorMessage>
              </FormControl>

              <Text fontSize="14px">Saldo anterior: ${montoCajaChica}</Text>
              <Flex width="100%" justifyContent="flex-end">
                <Button
                  type="submit"
                  size="sm"
                  width="100px"
                  border="1px"
                  borderColor="gray.500"
                  fontSize="12px"
                  fontWeight="bold"
                  my={2}
                >
                  Aceptar
                </Button>
                <Button
                  size="sm"
                  width="100px"
                  variant="ghost"
                  fontSize="12px"
                  fontWeight="bold"
                  m={2}
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
