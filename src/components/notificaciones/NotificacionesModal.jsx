import React, { useState, useEffect } from "react";

import {
  Popover,
  Portal,
  Button,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";

import {
  listenUserNotificacions,
  marcarTodasComoLeidas,
} from "../../firebase/firebase";

import { Notificacion } from "./Notificacion";

export const NotificacionesModal = ({ userId }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [noLeidas, setNoLeidas] = useState(0);
  useEffect(() => {
    if (userId) {
      listenUserNotificacions(userId, (notis) => {
        setNotificaciones(notis);
      });
    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setNoLeidas(
      notificaciones.filter((notificacion) => !notificacion.leida).length
    );
    //eslint-disable-next-line
  }, [notificaciones]);

  const handleMarkAsReadAll = async (userId) => {
    await marcarTodasComoLeidas(userId);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          width="20px"
          height="20px"
          borderRadius="50%"
          fontSize="12px"
          size="sm"
          color={noLeidas > 0 ? "white" : "gray.800"}
          border={noLeidas > 0 ? "none" : "1px"}
          borderColor={noLeidas > 0 ? "transparent" : "gray800"}
          backgroundColor={noLeidas > 0 ? "red" : "transparent"}
          padding="0px"
          paddingBottom="1px"
          minWidth="0px"
          _hover={{ bg: noLeidas > 0 ? "red.600" : "blackAlpha.200" }}
        >
          {noLeidas}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          w="400px"
          maxHeight="300px"
          overflowY="auto"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          border="1px"
          borderColor="gray.500"
        >
          <PopoverHeader>
            <Button
              variant="link"
              fontWeight="400"
              fontSize="14px"
              float="right"
              color="blue.500"
              onClick={() => handleMarkAsReadAll(userId)}
            >
              Marcar como leídas
            </Button>
          </PopoverHeader>
          <PopoverBody>
            {notificaciones.length > 0 &&
              notificaciones.map((notificacion) => {
                return (
                  <Notificacion
                    fechaEmision={notificacion.fechaEmision}
                    cuerpoNotificacion={notificacion.cuerpoNotificacion}
                    leida={notificacion.leida}
                    key={notificacion.id}
                    userId={userId}
                    notificacionId={notificacion.id}
                  />
                );
              })}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
