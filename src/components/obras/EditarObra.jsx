import React, { useState, useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { editObra, getJefesDeObra } from "../../firebase/firebase";

import {
  Box,
  Text,
  Button,
  Flex,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Modal,
  Select,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const schema = Yup.object({
  nombreObra: Yup.string().required("Campo requerido"),
  jefeDeObra: Yup.string().required("Campo requerido"),
});

export const EditarObra = ({ nombreObra, jefeAsignado, id }) => {
  const [jefesDeObra, setJefesDeObra] = useState([]);
  useEffect(() => {
    console.log("asd");
    const getJefes = async () => {
      await getJefesDeObra().then((jefes) => setJefesDeObra(jefes));
    };
    getJefes();
    setValue("nombreObra", nombreObra);
    setValue("jefeDeObra", jefeAsignado);
    // eslint-disable-next-line
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEditObra = async (data) => {
    await editObra(id, data);
    window.location.reload();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        border="1px"
        borderColor="gray.500"
        m={1}
        onClick={onOpen}
      >
        Editar obra
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="md">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent autoFocus={true} p={2}>
          <ModalHeader>
            <Text fontWeight="bold" fontSize="14px">
              EDITAR OBRA
            </Text>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <Stack as="form" onSubmit={handleSubmit(handleEditObra)}>
              <Box
                border="1px"
                borderColor="gray.500"
                borderRadius="5px"
                p={4}
                mb={3}
              >
                <FormControl isInvalid={errors.nombreObra}>
                  <FormLabel>Nombre de la obra</FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    borderColor="gray.500"
                    {...register("nombreObra")}
                  ></Input>
                  <FormErrorMessage>
                    {errors.nombreObra?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.jefeDeObra}>
                  <FormLabel mt="10px">Jefe de obra asignado</FormLabel>
                  <Select
                    placeholder="Seleccione uno"
                    borderColor="gray.500"
                    size="sm"
                    mb={2}
                    {...register("jefeDeObra")}
                  >
                    {jefesDeObra.length > 0 &&
                      jefesDeObra.map((jefe, index) => {
                        return (
                          <option value={jefe} key={`${jefe}-${index}`}>
                            {jefe}
                          </option>
                        );
                      })}
                  </Select>
                  <FormErrorMessage>
                    {errors.jefeDeObra?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
              <Flex justifyContent="flex-end" py={1}>
                <Button
                  type="submit"
                  size="sm"
                  border="1px"
                  borderColor="gray.500"
                  m={1}
                  isLoading={isSubmitting}
                >
                  Editar obra
                </Button>
                <Button
                  size="sm"
                  border="1px"
                  borderColor="gray.500"
                  m={1}
                  onClick={onClose}
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
