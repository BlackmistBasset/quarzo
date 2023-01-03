import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as xlsx from "xlsx";

import { UserProvider } from "../components/UserProvider";
import { Wrapper } from "../components/Wrapper";

import { Center, Spinner } from "@chakra-ui/react";

export const Contratistas = () => {
  const [userInfo, setUserInfo] = useState({});
  const [state, setState] = useState(0);
  const [excelItems, setExcelItems] = useState([]);

  const navigate = useNavigate();

  const handleUserLoggedIn = async (user) => {
    setUserInfo(user);
    setState(2);
  };

  const handleUserNotLoggedIn = () => navigate("/login");

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setExcelItems(json);
        console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  if (state === 2) {
    return (
      <>
        <Wrapper userInfo={userInfo} />
        <form>
          <label htmlFor="upload">Upload File</label>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
          />
        </form>
        {excelItems &&
          excelItems.map((item) => {
            return (
              <p key={`${item.Cantidad}-${item.FechaCreado}`}>
                {item.Autor}, {item.NombreItem}
              </p>
            );
          })}
      </>
    );
  } else {
    return (
      <UserProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        <Wrapper userInfo={userInfo}>
          <Center width="100%" height="70vh">
            <Spinner />
          </Center>
        </Wrapper>
      </UserProvider>
    );
  }
};
