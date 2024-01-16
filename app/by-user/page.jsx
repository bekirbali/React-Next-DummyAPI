"use client";

import PostCard from "@/app/components/post/PostCard";
import { PostContext } from "@/app/context/PostContext";
import Link from "next/link";
import React, { useContext } from "react";
import UpdatePostModal from "../components/post/UpdatePostModal";

const ByUser = () => {
  const { postsByUser, updateModal, setUpdateModal, thePost, setThePost } =
    useContext(PostContext);

  return (
    <>
      {updateModal && (
        <div className="modal fixed z-30 w-[100vw] h-[100%] top-0">
          <UpdatePostModal
            updateModal={updateModal}
            setUpdateModal={setUpdateModal}
            thePost={thePost}
            setThePost={setThePost}
          />
        </div>
      )}
      <div>
        <button>
          <Link href="/">← Home</Link>
        </button>
      </div>
      <div className="w-1/2 mx-auto flex flex-col gap-4">
        {postsByUser?.data?.map((post) => (
          <div key={post.id} className="border-b pb-2">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ByUser;
