"use client";

import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import AddUserModal from "../components/AddUserModal";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillTrash3Fill,
} from "react-icons/bs";

const Users = () => {
  const { deleteUser, getUserData, addUser, users, isLoading, page, setPage } =
    useContext(UserContext);

  const [addModal, setAddModal] = useState(false);

  const backHandler = () => {
    if (page === 0) {
      console.log("firstPage");
      return;
    }
    setPage(page - 1);
    return;
  };

  const nextHandler = () => {
    // if (page === dogalTaslar.length - 1) {
    //   console.log("lastPage");
    //   return;
    // }
    setPage(page + 1);
  };

  useEffect(() => {
    getUserData();
  }, [page]);

  return (
    <div className="min-h-[50vh]">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative">
          <div className="fixed">
            <AddUserModal addModal={addModal} setAddModal={setAddModal} />
          </div>
          <div className="flex items-center justify-end flex-col md:flex-row border-b p-2">
            Add User
            <button
              className="add-button max-w-20 ml-4"
              onClick={() => addUser()}
            >
              +
            </button>
          </div>
          <div>
            <div className="users flex justify-between mt-4">
              <div className="user-props picture">
                <span className="all-titles">PICTURE</span>
                {users.data.map((user) => {
                  return (
                    user?.picture && (
                      <Image
                        className="mt-2 mx-auto"
                        key={user.id}
                        src={user?.picture}
                        alt="avatar"
                        width={50}
                        height={50}
                      />
                    )
                  );
                })}
              </div>
              <div className="user-props title">
                <span className="all-titles">TITLE</span>
                {users.data.map((user) => {
                  return <p key={user.id}>{user.title}</p>;
                })}
              </div>
              <div className="user-props first-name">
                <span className="all-titles">FIRST NAME</span>
                {users.data.map((user) => {
                  return <p key={user.id}>{user.firstName}</p>;
                })}
              </div>
              <div className="user-props last-name">
                <span className="all-titles">LAST NAME</span>
                {users.data.map((user) => {
                  return <p key={user.id}>{user.lastName}</p>;
                })}
              </div>
              <div className="user-props id">
                <span className="all-titles">ID</span>
                {users.data.map((user) => {
                  return <p key={user.id}>{user.id}</p>;
                })}
              </div>
              <div className="delete">
                <span className="invisible">X</span>
                {users.data.map((user) => {
                  return (
                    <p key={user.id}>
                      <BsFillTrash3Fill onClick={() => deleteUser(user.id)} />
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="buttons flex justify-center gap-4 mt-4">
              <button>
                <BsFillArrowLeftCircleFill
                  size={24}
                  color="gray"
                  onClick={backHandler}
                />
              </button>
              <button>
                <BsFillArrowRightCircleFill
                  size={24}
                  color="gray"
                  onClick={nextHandler}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
