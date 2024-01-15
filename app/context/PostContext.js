"use client";

import axios from "axios";
import React, { createContext, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsByUser, setPostsByUser] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [page, setPage] = useState(0);

  const baseURL = "https://dummyapi.io/data/v1/";

  const getPostData = async () => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}post?page=${page}&limit=10`,
      headers: { "app-id": "659eae0becacd5103832dd63" },
    });
    setPosts(data);
    setIsLoading(false);
    setTotalPostCount(data.total);
    console.log(data);
  };

  const getPostByUser = async (post) => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}user/${post.owner.id}/post`,
      headers: { "app-id": "659eae0becacd5103832dd63" },
    });
    setPostsByUser(data);
    console.log(postsByUser);
  };

  const getPostByTag = async (post) => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}user/${user.owner.id}/post`,
      headers: { "app-id": "659eae0becacd5103832dd63" },
    });
    setPostsByUser(data);
    console.log(postsByUser);
  };

  const values = {
    getPostData,
    posts,
    isLoading,
    page,
    setPage,
    totalPostCount,
    setTotalPostCount,
    getPostByUser,
    postsByUser,
  };
  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
