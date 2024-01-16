"use client";

import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import PostCard from "../components/post/PostCard";
import UpdatePostModal from "../components/post/UpdatePostModal";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useRouter } from "next/navigation";
import AddPostModal from "../components/post/AddPostModal";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Post = () => {
  const router = useRouter();

  const {
    getPostData,
    page,
    setPage,
    posts,
    updateModal,
    getPostByTag,
    tagText,
    setTagText,
    addModal,
    setAddModal,
    totalPostCount,
  } = useContext(PostContext);

  const searchHandler = (e) => {
    e.preventDefault();
    getPostByTag(tagText);
    router.push("/by-tag");
  };

  const previousPage = () => {
    if (page === 0) {
      toastWarnNotify("This is the first page!");
      return;
    }
    setPage(page - 1);
    return;
  };

  const nextPage = () => {
    if (page === Math.floor(totalPostCount / 10)) {
      toastWarnNotify("This is the last page!");
      return;
    }
    setPage(page + 1);
  };

  useEffect(() => {
    getPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="mt-4 flex flex-col">
      {addModal && (
        <div className="modal fixed z-30 w-[100vw] h-[100%] top-0">
          <AddPostModal addModal={addModal} setAddModal={setAddModal} />
        </div>
      )}
      {updateModal && (
        <div className="modal fixed z-30 w-[100vw] h-[100%] top-0">
          <UpdatePostModal />
        </div>
      )}
      <div className="flex items-center justify-between gap-2 flex-col md:flex-row p-2">
        <div className="flex gap-4">
          <form className="relative" onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Search a tag"
              className="search-input"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
            />
            <button>
              <PiMagnifyingGlass className="absolute right-2 top-3 text-black" />
            </button>
          </form>
        </div>
        <div>
          <span className="hover:cursor-default"> Add Post</span>
          <button
            className="add-button max-w-20 ml-4"
            onClick={() => setAddModal(true)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 border-t py-4 mt-2">
        {posts?.data?.map((post) => {
          return (
            <div key={post.id} className="border-y p-2 flex flex-col w-[48%]">
              <PostCard post={post} />
            </div>
          );
        })}
      </div>
      <div className="buttons flex justify-center gap-4 mt-4">
        <button>
          <BsFillArrowLeftCircleFill
            size={24}
            color="gray"
            onClick={previousPage}
          />
        </button>
        <button>
          <BsFillArrowRightCircleFill
            size={24}
            color="gray"
            onClick={nextPage}
          />
        </button>
      </div>
    </div>
  );
};

export default Post;
