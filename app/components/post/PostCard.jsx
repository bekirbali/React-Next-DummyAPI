import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context/PostContext";
import Link from "next/link";
import { v4 as uuid } from "uuid";

const PostCard = ({ post }) => {
  const [more, setMore] = useState(false);

  const {
    getPostByUser,
    getPostByTag,
    setTagText,
    deletePost,
    setUpdateModal,
    setThePost,
  } = useContext(PostContext);

  const today = new Date();
  const postDate = new Date(post.publishDate);
  const since = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));

  const yearSince = Math.floor(since / 365);
  const monthSince = Math.floor((since % 365) / 30);
  const day = (since % 365) % 30;

  const getPostByTagHandler = (tag) => {
    setTagText(tag);
    getPostByTag(tag);
  };

  const updateHandler = (post) => {
    const { text, tags, image, id } = post;
    console.log(post);
    setThePost({
      text: text,
      tags: tags,
      image: image,
      id: id,
    });
    setUpdateModal(true);
    setMore(false);
  };

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  return (
    <div className="flex flex-col w-full text-center">
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full">
          {/* Post Owner */}
          <div className="flex gap-2 items-center w-full">
            {post.owner?.picture && (
              <Image
                className="w-[50px] h-[50px]"
                src={post.owner.picture}
                width={50}
                height={50}
                alt="owner"
              />
            )}{" "}
            <p>
              <span className="capitalize"> {post.owner.title}</span>{" "}
              {post.owner.firstName} {post.owner.lastName}
            </p>
            {yearSince ? (
              <p> {`● ${yearSince}y ${monthSince}m ${day}d`}</p>
            ) : monthSince ? (
              <p> {`● ${monthSince}m ${day}d`}</p>
            ) : (
              <p>{`● ${day}d`}</p>
            )}
          </div>

          {/* 3 dot Menu */}
          <div className="relative flex items-center justify-center flex-col">
            <button onClick={() => setMore(!more)} className="cursor-pointer">
              ⋯
            </button>
            <div
              className={`absolute z-20 right-[30px] top-[30px] bg-[#d1d1d1d8] text-black w-[250px] items-start p-2 flex-col ${
                more ? "flex" : "hidden"
              }`}
            >
              <button
                className="border-b cursor-default"
                onClick={() => getPostByUser(post)}
              >
                More from{" "}
                <Link href="/by-user">
                  <span className="capitalize cursor-pointer text-blue-600">
                    {post.owner.title} {post.owner.lastName}
                  </span>
                </Link>
              </button>
              {post.tags.map((tag) => {
                return (
                  <button
                    key={unique_id + (Math.random() + 1)}
                    className="border-b"
                  >
                    More about #
                    <Link href="/by-tag">
                      <span
                        className="text-blue-600"
                        onClick={(e) => getPostByTag(e.target.innerText)}
                      >
                        {tag}
                      </span>
                    </Link>
                  </button>
                );
              })}
              <button onClick={() => deletePost(post)}>Delete</button>
              <button onClick={() => updateHandler(post)}>Update</button>
            </div>
          </div>

          {/* Post */}
        </div>
        {post?.image && (
          <Image
            className="w-full h-auto max-h-[500px]"
            src={post.image}
            width={50}
            height={50}
            alt="post"
          />
        )}
        <div className="w-full flex flex-col gap-2 mt-2">
          <p className="w-full text-left">{post.likes} ❤ likes</p>
          <div className="flex gap-2 w-full">
            {post.tags.map((tag) => {
              return (
                <div key={small_id + (Math.random() + 1)} className="flex">
                  <p>#</p>
                  <Link href="by-tag">
                    <p onClick={(e) => getPostByTagHandler(e.target.innerText)}>
                      {tag}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="w-full text-left">
            <span className="font-bold capitalize">
              @{post.owner.title} {post.owner.lastName}
            </span>{" "}
            {post.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
