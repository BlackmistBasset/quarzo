import React from "react";

import { HStack, Text, Button, Box } from "@chakra-ui/react";

import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineDownloadDone } from "react-icons/md";

import { marcarComoLeida, borrarNotificacion } from "../../firebase/firebase";

export const Notificacion = ({
  fechaEmision,
  cuerpoNotificacion,
  leida,
  notificacionId,
  userId,
}) => {
  const handleMarkAsRead = async (userId, notificacionId) => {
    await marcarComoLeida(userId, notificacionId);
  };

  const handleDeleteNotification = async (userId, notificacionId) => {
    await borrarNotificacion(userId, notificacionId);
  };

  return (
    <HStack
      borderBottom="1px"
      marginBottom={1}
      borderColor="gray.500"
      p={2}
      backgroundColor={leida ? "white" : "gray.100"}
      justifyContent="space-between"
    >
      <Text width="220px" fontSize="13px" fontWeight={leida ? "400" : "bold"}>
        {cuerpoNotificacion}
      </Text>
      <Text fontSize="13px" fontWeight={leida ? "400" : "bold"}>
        {fechaEmision}
      </Text>
      <Box display="flex" w="40px">
        <Button
          width="20px"
          cursor="pointer"
          variant="unstyled"
          minWidth="0px"
          onClick={() => handleMarkAsRead(userId, notificacionId)}
        >
          <MdOutlineDownloadDone />
        </Button>
        <Button
          w="20px"
          cursor="pointer"
          variant="unstyled"
          minWidth="0px"
          onClick={() => handleDeleteNotification(userId, notificacionId)}
        >
          <TiDeleteOutline />
        </Button>
      </Box>
    </HStack>
  );
};
