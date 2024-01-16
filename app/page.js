"use client";

import { useContext, useEffect } from "react";
import Post from "./post/page";
import Users from "./users/page";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";

export default function Home() {
  const { isLoading, getUserData } = useContext(UserContext);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center bg-yellow-500 h-[120px] text-[#e7ebe2]">
        <h1 className="text-3xl font-bold cursor-default">Users and Posts</h1>
      </div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div>
          <div>
            <Users />
          </div>
          <div>
            <Post />
          </div>
        </div>
      )}
    </>
  );
}
