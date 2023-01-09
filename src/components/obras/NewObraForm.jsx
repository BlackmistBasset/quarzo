import React, { useState, useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { addNewObra, getJefesDeObra } from "../../firebase/firebase";

import {
  Text,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Flex,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";

const schema = Yup.object({
  nombreObra: Yup.string().required("Campo requerido"),
  jefeDeObra: Yup.string().required("Campo requerido"),
});

export const NewObraForm = () => {
  const [jefesDeObra, setJefesDeObra] = useState([]);
  useEffect(() => {
    const getJefes = async () => {
      await getJefesDeObra().then((jefes) => setJefesDeObra(jefes));
    };
    getJefes();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddItem = async (data) => {
    const newObra = { ...data };
    newObra.fechaCreada = new Date().toLocaleDateString();
    newObra.presupuestos = ["presupuestos"];
    newObra.contratistasYServicios = ["contratistas y servicios"];
    newObra.compras = [];
    await addNewObra(newObra);
    onClose();
    window.location.reload();
  };

  return (
    <>
      <Button
        size="sm"
        border="1px"
        borderColor="gray.500"
        ml="20px"
        fontSize="12px"
        fontWeight="bold"
        onClick={onOpen}
      >
        NUEVA OBRA
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              AGREGAR OBRA
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Stack as="form" onSubmit={handleSubmit(handleAddItem)}>
              <FormControl isInvalid={errors.nombreObra}>
                <FormLabel>Nombre de la obra</FormLabel>
                <Input
                  type="text"
                  borderColor="gray.500"
                  {...register("nombreObra")}
                ></Input>
                <FormErrorMessage>
                  {errors.nombreObra?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.jefeDeObra}>
                <FormLabel>Jefe de obra asignado</FormLabel>
                <Select
                  placeholder="Seleccione uno"
                  borderColor="gray.500"
                  {...register("jefeDeObra")}
                >
                  {jefesDeObra.length > 0 &&
                    jefesDeObra.map((jefe, index) => {
                      return (
                        <option value={jefe} key={`${jefe}-${jefe[index]}`}>
                          {jefe}
                        </option>
                      );
                    })}
                </Select>
                <FormErrorMessage>
                  {errors.jefeDeObra?.message}
                </FormErrorMessage>
              </FormControl>
              <Flex justifyContent="center">
                <Button
                  type="submit"
                  size="lg"
                  w={150}
                  mt="30px"
                  backgroundColor="grey"
                  color="white"
                  _hover={{ bg: "blackAlpha.400" }}
                  isLoading={isSubmitting}
                >
                  Aceptar
                </Button>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
