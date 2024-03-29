"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toastSuccessNotify } from "../utils/Toastify";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [page, setPage] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const baseURL = `https://dummyapi.io/data/v1/`;

  const getUserData = async () => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}user?page=${page}&limit=25`,
      headers: { "app-id": process.env.NEXT_PUBLIC_APP_ID },
    });
    setUsers(data);
    setIsLoading(false);
    setTotalUserCount(data.total);
  };

  const getUserById = async (user) => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}user/${user.id}`,
      headers: { "app-id": process.env.NEXT_PUBLIC_APP_ID },
    });
    setIdUser(data);
  };

  const addUser = async () => {
    try {
      await axios.post(
        `${baseURL}user/create`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          title: title,
          picture: picture,
        },
        { headers: { "app-id": process.env.NEXT_PUBLIC_APP_ID } }
      );
      toastSuccessNotify(`${firstName} created succesfully!`);
    } catch (error) {
      toastErrorNotify(`${firstName} could not created!!`);
    }
  };

  const updateUser = async (user) => {
    try {
      await axios.put(
        `${baseURL}user/${user.id}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          title: user.title,
          picture: user.picture,
        },
        { headers: { "app-id": process.env.NEXT_PUBLIC_APP_ID } }
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
        url: `${baseURL}user/${user.id}`,
        headers: { "app-id": process.env.NEXT_PUBLIC_APP_ID },
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
    idUser,
    setIdUser,
    getUserById,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
