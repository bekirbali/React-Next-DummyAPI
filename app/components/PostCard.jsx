import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import Link from "next/link";

const PostCard = ({ post }) => {
  const [more, setMore] = useState();

  const { getPostByUser, postsByUser } = useContext(PostContext);

  const today = new Date();
  const postDate = new Date(post.publishDate);
  const since = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));

  const yearSince = Math.floor(since / 365);
  const monthSince = Math.floor((since % 365) / 30);
  const day = (since % 365) % 30;

  const postByUserHandler = (post) => {
    getPostByUser(post);
  };

  return (
    <div className="flex flex-col w-full text-center border-2 border-yellow-300 px-2">
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full">
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
          <div className="relative flex items-center justify-center flex-col">
            <button onClick={() => setMore(!more)} className="cursor-pointer">
              ⋯
            </button>
            <div
              className={`absolute right-[30px] top-[30px] bg-[#d1d1d1d8] text-black w-[250px] p-2 ${
                more ? "flex" : "hidden"
              }`}
            >
              <button onClick={() => postByUserHandler(post)}>
                <Link href="post/by-user">
                  Get more from{" "}
                  <span className="capitalize">{post.owner.title}</span>{" "}
                  {post.owner.lastName}
                </Link>
              </button>
            </div>
          </div>
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
        <p className="w-full text-left">{post.likes} ❤ likes</p>
        <div className="flex gap-2 w-full">
          {post.tags.map((tag) => (
            <p key={Math.random()}>#{tag}</p>
          ))}
        </div>
        <p className="w-full text-left">
          <span className="font-bold capitalize">
            @{post.owner.title} {post.owner.lastName}
          </span>{" "}
          {post.text}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
