"use client";

import React, { useContext, useEffect } from "react";
import PostCard from "@/app/components/post/PostCard";
import { PostContext } from "@/app/context/PostContext";
import Link from "next/link";
import UpdatePostModal from "../components/post/UpdatePostModal";

const ByTag = () => {
  const {
    postsByTag,
    tagText,
    updateModal,
    setUpdateModal,
    thePost,
    setThePost,
  } = useContext(PostContext);

  return (
    <div className="mt-4 flex flex-col">
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
      <p className="capitalize">More about {tagText}</p>
      <div className="flex flex-wrap justify-center gap-4 border-t py-4 mt-2">
        {postsByTag?.data?.map((post) => {
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

export default ByTag;
