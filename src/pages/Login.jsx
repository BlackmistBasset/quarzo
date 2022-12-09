import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { UserProvider } from "../components/UserProvider";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { BiShow, BiHide } from "react-icons/bi";
import {
  Center,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";

const schema = Yup.object({
  email: Yup.string()
    .email("Ingrese un e-mail válido")
    .required("Campo requerido"),
  password: Yup.string()
    .min(6, "La contaseña debe tener al menos 6 caracteres")
    .required("Campo requerido"),
});

export const Login = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState("initial");
  const [loginError, setLoginError] = useState(false);
  const [show, setShow] = useState(false);
  const checkPassword = () => setShow(!show);

  const handleLogin = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setLoginError(false);
      })
      .catch(() => {
        setLoginError(true);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUserLoggedIn = (user) => {
    navigate("/compras");
  };

  const handleUserNotLoggedIn = () => {
    setIsLoggedIn("not logged");
  };

  if (isLoggedIn === "not logged") {
    return (
      <UserProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <Center w="100vw" h="100vh" backgroundColor="gray.100">
          <Flex align="center" justify="center" flexDirection="column">
            <Center
              w={400}
              h={100}
              border="1px"
              borderColor="gray.500"
              borderRadius="10px"
              backgroundColor="white"
            >
              <Text fontSize="50px" fontWeight="bold" color="grey">
                Bienvenido
              </Text>
            </Center>
            <Flex
              w={400}
              h={350}
              border="1px"
              borderColor="gray.500"
              borderRadius="10px"
              p={10}
              m={5}
              backgroundColor="white"
              flexDirection="column"
            >
              <Stack as="form" onSubmit={handleSubmit(handleLogin)}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    borderColor="gray.500"
                    {...register("email")}
                  ></Input>
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      borderColor="gray.500"
                      type={show ? "text" : "password"}
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
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
                {loginError ? (
                  <Text color="red">
                    El usuario y/o la contraseña son incorrectos
                  </Text>
                ) : (
                  ""
                )}
                <Flex justifyContent="space-between" mt="30px">
                  <Button
                    type="submit"
                    size="lg"
                    w={150}
                    mt="30px"
                    backgroundColor="grey"
                    color="white"
                    _hover={{ bg: "blackAlpha.400" }}
                    onClick={() => navigate("/register")}
                  >
                    Registrarse
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    w={150}
                    mt="30px"
                    backgroundColor="grey"
                    color="white"
                    isLoading={isSubmitting}
                    _hover={{ bg: "blackAlpha.400" }}
                  >
                    Ingresar
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </Flex>
        </Center>
      </UserProvider>
    );
  } else {
    return (
      <UserProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <Center width="100%" height="100vh">
          <Spinner />
        </Center>
      </UserProvider>
    );
  }
};
