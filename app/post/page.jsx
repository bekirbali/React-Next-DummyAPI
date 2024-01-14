"use client";

import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import Image from "next/image";

const Post = () => {
  const { getPostData, page, setPage, posts } = useContext(PostContext);

  useEffect(() => {
    getPostData();
  }, [page]);

  return (
    <div>
      <h1>
        {posts?.data?.map((post) => {
          return (
            <div key={post.id}>
              <Image src={post.image} width={50} height={50} alt="post" />
            </div>
          );
        })}
      </h1>
    </div>
  );
};

export default Post;
