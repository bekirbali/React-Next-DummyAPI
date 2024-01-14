"use client";

import axios from "axios";
import React, { createContext, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [page, setPage] = useState(0);

  const baseURL = "https://dummyapi.io/data/v1/post";

  const getPostData = async () => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}?page=${page}&limit=10`,
      headers: { "app-id": "659eae0becacd5103832dd63" },
    });
    setPosts(data);
    setIsLoading(false);
    setTotalPostCount(data.total);
    console.log(data);
  };

  const values = {
    getPostData,
    posts,
    isLoading,
    page,
    setPage,
    totalPostCount,
    setTotalPostCount,
  };
  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
