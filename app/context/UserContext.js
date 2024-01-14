"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toastSuccessNotify } from "../utils/Toastify";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [page, setPage] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const baseURL = `https://dummyapi.io/data/v1/user`;

  const getUserData = async () => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}?page=${page}&limit=25`,
      headers: { "app-id": "659eae0becacd5103832dd63" },
    });
    setUsers(data);
    setIsLoading(false);
    setTotalUserCount(data.total);
  };

  const addUser = async () => {
    try {
      await axios.post(
        `${baseURL}/create`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          title: title,
          picture: picture,
        },
        { headers: { "app-id": "659eae0becacd5103832dd63" } }
      );
      toastSuccessNotify(`${firstName} created succesfully!`);
    } catch (error) {
      toastErrorNotify(`${firstName} could not created!!`);
    }
  };

  const updateUser = async (user) => {
    try {
      await axios.put(
        `${baseURL}/${user.id}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          title: user.title,
          picture: user.picture,
        },
        { headers: { "app-id": "659eae0becacd5103832dd63" } }
      );
      toastSuccessNotify(`${user.firstName} updated succesfully!`);
      getUserData();
    } catch (error) {
      toastErrorNotify(`${user.firstName} could not updated!!`);
    }
  };

  const deleteUser = async (user) => {
    try {
      await axios({
        method: "delete",
        url: `${baseURL}/${user.id}`,
        headers: { "app-id": "659eae0becacd5103832dd63" },
      });
      getUserData();
      toastSuccessNotify(`${user.firstName} deleted succesfully!`);
    } catch (error) {
      toastErrorNotify(`${user.firstName} could not deleted!!`);
    }
  };

  const values = {
    getUserData,
    deleteUser,
    addUser,
    updateUser,
    users,
    isLoading,
    page,
    setPage,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    title,
    setTitle,
    picture,
    setPicture,
    totalUserCount,
    setTotalUserCount,
    searchText,
    setSearchText,
    searchResults,
    setSearchResults,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
