"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toastSuccessNotify, toastErrorNotify } from "@/utils/Toastify";
import { headers } from "@/next.config";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const baseURL = `https://dummyapi.io/data/v1/user`;

  const getUserData = async () => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}?page=${page}&limit=15`,
      headers: { "app-id": "659eae0becacd5103832dd63" },
    });
    setUsers(data);
    setLoading(false);
  };

  const deleteUser = async (user) => {
    console.log(user);
    try {
      await axios({
        method: "delete",
        url: `${baseURL}/${user}`,
        headers: { "app-id": "659eae0becacd5103832dd63" },
      });
      getUserData();
      toastSuccessNotify(`${user.firstName} deleted succesfully!`);
    } catch (error) {
      toastErrorNotify(`${user.firstName} could not deleted!!`);
    }
  };

  const addUser = async () => {
    try {
      await axios.post(
        `${baseURL}/create`,
        {
          firstName: "test",
          lastName: "bali",
          email: "testtsets@gmail.com",
        },
        { headers: { "app-id": "659eae0becacd5103832dd63" } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    getUserData,
    deleteUser,
    addUser,
    users,
    isLoading,
    page,
    setPage,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
