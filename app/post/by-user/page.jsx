"use client";

import PostCard from "@/app/components/PostCard";
import { PostContext } from "@/app/context/PostContext";
import React, { useContext, useEffect } from "react";

const ByUser = () => {
  const { getPostByUser, postsByUser } = useContext(PostContext);

  useEffect(() => {
    console.log(postsByUser, "test");
  });

  return (
    <div className="w-1/2 mx-auto">
      {postsByUser?.data?.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default ByUser;
