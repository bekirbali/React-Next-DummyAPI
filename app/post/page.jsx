"use client";

import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import Image from "next/image";
import PostCard from "../components/PostCard";

const Post = () => {
  const { getPostData, page, setPage, posts } = useContext(PostContext);

  useEffect(() => {
    getPostData();
  }, [page]);

  return (
    <div className="mt-4 flex flex-col">
      <form>
        <input type="text" placeholder="search" />
      </form>
      <div className="flex flex-wrap justify-center gap-4 border-t py-4 mt-2">
        {posts?.data?.map((post) => {
          return (
            <div key={post.id} className="border-y p-2 flex flex-col w-[48%]">
              <PostCard post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
