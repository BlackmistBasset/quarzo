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
  Input,
  FormErrorMessage,
  Flex,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { añadirMovimiento, restarMontoCaja } from "../../firebase/firebase";
import { agregarUnDia } from "../../utils/utils";
const schema = Yup.object({
  fechaMovimiento: Yup.string().required("Campo requerido"),
  concepto: Yup.string().required("Campo requerido"),
  montoMovimiento: Yup.string().required("Campo requerido"),
});

export const AñadirMovimientoForm = ({ cajaChica, jefeId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddItem = async (data) => {
    const parsedData = { ...data };
    parsedData.fechaMovimiento = agregarUnDia(data.fechaMovimiento);

    parsedData.saldoCaja = cajaChica - data.montoMovimiento;

    if (parsedData.saldoCaja >= 0) {
      await restarMontoCaja(jefeId, cajaChica, parsedData.montoMovimiento);
      await añadirMovimiento(jefeId, parsedData);
      onClose();
      window.location.reload();
    } else {
      alert(
        "No se pudo completar la operación porque el saldo de caja quedaría en negativo. Por favor revise los datos"
      );
    }
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
        Nuevo movimiento
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              AÑADIR MOVIMIENTO
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Stack
              as="form"
              onSubmit={handleSubmit(handleAddItem)}
              border="1px"
              borderColor="gray.500"
              borderRadius="5px"
              px={4}
              py={2}
              my={2}
            >
              <FormControl isInvalid={errors.fechaMovimiento}>
                <FormLabel>Fecha</FormLabel>
                <Input
                  type="date"
                  borderColor="gray.500"
                  {...register("fechaMovimiento")}
                ></Input>
                <FormErrorMessage>
                  {errors.fechaMovimiento?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.concepto}>
                <FormLabel>Concepto</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  {...register("concepto")}
                ></Input>
                <FormErrorMessage>{errors.concepto?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.montoMovimiento}>
                <FormLabel>Monto</FormLabel>
                <Input
                  type="number"
                  borderColor="gray.500"
                  {...register("montoMovimiento")}
                ></Input>
                <FormErrorMessage>
                  {errors.montoMovimiento?.message}
                </FormErrorMessage>
              </FormControl>
              <Flex justifyContent="flex-end">
                <Button
                  type="submit"
                  size="sm"
                  border="1px"
                  borderColor="gray.500"
                  my={2}
                  fontSize="12px"
                  fontWeight="bold"
                  marginTop="15px"
                >
                  Aceptar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  m={2}
                  fontSize="12px"
                  fontWeight="bold"
                  marginTop="15px"
                >
                  Cancelar
                </Button>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
