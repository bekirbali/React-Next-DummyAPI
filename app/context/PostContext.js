"use client";

import axios from "axios";
import React, { createContext, useState } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../utils/Toastify";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsByUser, setPostsByUser] = useState([]);
  const [postsByTag, setPostsByTag] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tagText, setTagText] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [thePost, setThePost] = useState({
    text: "",
    tags: [],
    image: "",
    id: "",
  });

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
  };

  const getPostByUser = async (post) => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}user/${post.owner.id}/post`,
      headers: { "app-id": "659eae0becacd5103832dd63" },
    });
    setPostsByUser(data);
  };

  const getPostByTag = async (tag) => {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}tag/${tag}/post`,
      headers: { "app-id": "659eae0becacd5103832dd63" },
    });
    setPostsByTag(data);
  };

  const addPost = async () => {
    try {
      await axios.post(
        `${baseURL}post/create`,
        {
          text: thePost.text,
          image: thePost.image,
          tags: thePost.tags,
          owner: "60d0fe4f5311236168a109d5",
        },
        { headers: { "app-id": "659eae0becacd5103832dd63" } }
      );
      toastSuccessNotify(`post updated succesfully!`);
      getPostData();
    } catch (error) {
      toastErrorNotify(`post could not created!!`);
    }
  };

  const updatePost = async (post) => {
    try {
      await axios.put(
        `${baseURL}post/${post.id}`,
        {
          text: post.text,
          image: post.image,
          tags: post.tags,
        },
        { headers: { "app-id": "659eae0becacd5103832dd63" } }
      );
      toastSuccessNotify(`post updated succesfully!`);
      getPostData();
    } catch (error) {
      toastErrorNotify(`post could not updated!!`);
    }
  };

  const deletePost = async (post) => {
    try {
      await axios({
        method: "delete",
        url: `${baseURL}post/${post.id}`,
        headers: { "app-id": "659eae0becacd5103832dd63" },
      });
      getPostData();
      toastSuccessNotify(`post deleted succesfully!`);
    } catch (error) {
      toastErrorNotify(`post could not deleted!!`);
    }
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
    getPostByTag,
    postsByTag,
    setPostsByTag,
    tagText,
    setTagText,
    deletePost,
    updateModal,
    setUpdateModal,
    thePost,
    setThePost,
    updatePost,
    addModal,
    setAddModal,
    addPost,
  };
  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
