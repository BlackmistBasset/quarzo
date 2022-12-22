import React, { useState, useEffect } from "react";

import { Box, Center, Text } from "@chakra-ui/react";
import { TableRow } from "./TableRow";

export const TableContainer = ({
  items,
  userInfo,
  selectedObra,
  selectedFilter,
}) => {
  const [hasItems, setHasItems] = useState(false);
  const [hasFilterResult, setHasFilterResult] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  useEffect(() => {
    if (items) setHasItems(true);
  }, [items]);
  useEffect(() => {
    if (items) {
      setHasItems(true);
      let newItems = items.filter(
        (item) => item.estadoPedido === selectedFilter
      );

      if (newItems.length === 0) {
        setHasFilterResult(false);
        setFilteredItems([]);
      } else {
        setHasFilterResult(true);
        setFilteredItems(newItems);
      }
    }
    // eslint-disable-next-line
  }, [selectedFilter]);
  if (selectedFilter === "Todos") {
    return (
      <>
        <Box height="75%" overflowY="scroll">
          {hasItems ? (
            ""
          ) : (
            <Center width="100%">
              <Text p={3}>Aún no hay ítems cargados</Text>
            </Center>
          )}
          {items &&
            items.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                user={userInfo}
                selectedObra={selectedObra}
              />
            ))}
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box height="75%" overflowY="scroll">
          {hasFilterResult ? (
            ""
          ) : (
            <Center width="100%">
              <Text p={3}>
                No hay ningún ítem que cumpla los requisitos de ésta búsqueda.
              </Text>
            </Center>
          )}
          {filteredItems &&
            filteredItems.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                user={userInfo}
                selectedObra={selectedObra}
              />
            ))}
        </Box>
      </>
    );
  }
};
