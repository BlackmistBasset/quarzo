import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, registerNewUser } from "../firebase/firebase";

import { BiShow, BiHide } from "react-icons/bi";
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Select,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

const schema = Yup.object({
  email: Yup.string()
    .email("Ingrese un e-mail válido")
    .required("Campo requerido"),
  firstName: Yup.string().required("Campo requerido"),
  lastName: Yup.string().required("Campo requerido"),
  userType: Yup.string().required("Campo requerido"),
  password: Yup.string()
    .min(6, "La contaseña debe tener al menos 6 caracteres")
    .required("Campo requerido"),
  confirmPassword: Yup.string()
    .min(6, "La contaseña debe tener al menos 6 caracteres")
    .required("Campo requerido")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
});

export const Register = () => {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);

  const checkPassword = () => setShow(!show);
  const checkConfirmPassword = () => setConfirmShow(!confirmShow);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const handleRegister = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = {
          uid: userCredential.user.uid,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          userType: data.userType,
        };
        registerNewUser(user);
        navigate("/compras");
      })
      .catch((err) => {
        const errorMessage = err.message;
        console.log(errorMessage);
      });
  };
  return (
    <Center w="100vw" h="100vh" backgroundColor="gray.100">
      <Flex align="center" justify="center" flexDirection="column">
        <Flex
          w={400}
          border="1px"
          borderColor="gray.500"
          borderRadius="10px"
          p={10}
          m={5}
          backgroundColor="white"
          flexDirection="column"
        >
          <Stack as="form" onSubmit={handleSubmit(handleRegister)}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                borderColor="gray.500"
                {...register("email")}
              ></Input>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.firstName}>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                borderColor="gray.500"
                {...register("firstName")}
              ></Input>
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastName}>
              <FormLabel>Apellido</FormLabel>
              <Input
                type="text"
                borderColor="gray.500"
                {...register("lastName")}
              ></Input>
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.userType}>
              <FormLabel>Tipo de usuario</FormLabel>
              <Select
                placeholder="Seleccione uno"
                borderColor="gray.500"
                {...register("userType")}
              >
                <option value="compras">Compras</option>
                <option value="jefeDeObra">Jefe de obra</option>
                <option value="coordinador">Coordinador</option>
              </Select>
              <FormErrorMessage>{errors.userType?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  borderColor="gray.500"
                  {...register("password")}
                ></Input>
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="md"
                    backgroundColor="transparent"
                    onClick={checkPassword}
                  >
                    {show ? <BiHide /> : <BiShow />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel>Confirmar contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={confirmShow ? "text" : "password"}
                  borderColor="gray.500"
                  {...register("confirmPassword")}
                ></Input>
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="md"
                    backgroundColor="transparent"
                    onClick={checkConfirmPassword}
                  >
                    {confirmShow ? <BiHide /> : <BiShow />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.confirmPassword?.message}
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
                onClick={() => navigate("/register")}
              >
                Registrarse
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Center>
  );
};
