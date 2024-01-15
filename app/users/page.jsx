"use client";

import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import AddUserModal from "../components/AddUserModal";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillTrash3Fill,
  BsFillPencilFill,
} from "react-icons/bs";
import { PiMagnifyingGlass } from "react-icons/pi";
import UpdateUserModal from "../components/UpdateUserModal";
import { UserContext } from "../context/UserContext";
import { toastWarnNotify } from "../utils/Toastify";

const Users = () => {
  const {
    deleteUser,
    getUserData,
    users,
    isLoading,
    page,
    setPage,
    totalUserCount,
    searchText,
    setSearchText,
    searchResults,
    setSearchResults,
  } = useContext(UserContext);

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [noResult, setNoResult] = useState("");
  const [theUser, setTheUser] = useState({
    firstName: "",
    lastName: "",
    title: "",
    picture: "",
    id: "",
  });

  const previousPage = () => {
    if (page === 0) {
      toastWarnNotify("This is the first page!");
      return;
    }
    setPage(page - 1);
    return;
  };

  const nextPage = () => {
    if (page === Math.floor(totalUserCount / 25)) {
      toastWarnNotify("This is the last page!");
      return;
    }
    setPage(page + 1);
  };

  const updateHandler = (user) => {
    setUpdateModal(true);
    const { firstName, lastName, title, id, picture } = user;
    setTheUser({
      firstName: firstName,
      lastName: lastName,
      title: title,
      picture: picture,
      id: id,
    });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const filteredSearch = users.data.filter((user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase())
    );
    if (!filteredSearch.length) {
      setNoResult("No Match");
      return;
    }
    setSearchResults(filteredSearch);
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, theUser]);

  return (
    <div>
      {/* Loading Screen */}
      {isLoading ? (
        <p>Loading...</p>
      ) : noResult ? (
        <div className="flex gap-4">
          <p>{noResult}</p>
          <button
            onClick={() => {
              setSearchResults([]);
              setSearchText("");
              setNoResult("");
            }}
            className="border rounded-md px-2 bg-[#e0e0e0] text-[#201e1e]"
          >
            Clear Filter
          </button>
        </div>
      ) : searchResults.length ? (
        <>
          {addModal && (
            <div className="modal fixed w-[100vw] h-[100%] top-0">
              <AddUserModal addModal={addModal} setAddModal={setAddModal} />
            </div>
          )}
          {updateModal && (
            <div className="modal fixed w-[100vw] h-[100%] top-0">
              <UpdateUserModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                theUser={theUser}
                setTheUser={setTheUser}
              />
            </div>
          )}
          <div className="flex items-center justify-between gap-2 flex-col md:flex-row border-b p-2">
            <div className="flex gap-4">
              <form className="relative" onSubmit={searchHandler}>
                <input
                  type="text"
                  placeholder="Search a user"
                  className="search-input"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button>
                  <PiMagnifyingGlass className="absolute right-2 top-3 text-black" />
                </button>
              </form>
              <button
                onClick={() => {
                  setSearchResults([]);
                  setSearchText("");
                  setNoResult("");
                }}
                className="border rounded-md px-2"
              >
                Clear Filter
              </button>
            </div>
            <div>
              <span className="hover:cursor-default"> Add User</span>
              <button
                className="add-button max-w-20 ml-4"
                onClick={() => setAddModal(true)}
              >
                +
              </button>
            </div>
          </div>
          <div className="px-2">
            <div className="users flex justify-between mt-4">
              <div className="user-props picture">
                <span className="all-titles">PICTURE</span>
                {searchResults.map((user) => {
                  return (
                    user?.picture && (
                      <Image
                        className="image"
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
                {searchResults.map((user) => {
                  return (
                    <p key={user.id} className="capitalize">
                      {user.title}
                    </p>
                  );
                })}
              </div>
              <div className="user-props first-name">
                <span className="all-titles">FIRST NAME</span>
                {searchResults.map((user) => {
                  return <p key={user.id}>{user.firstName}</p>;
                })}
              </div>
              <div className="user-props last-name">
                <span className="all-titles">LAST NAME</span>
                {searchResults.map((user) => {
                  return <p key={user.id}>{user.lastName}</p>;
                })}
              </div>
              <div className="user-props id">
                <span className="all-titles">ID</span>
                {searchResults.map((user) => {
                  return <p key={user.id}>{user.id}</p>;
                })}
              </div>
              <div className="delete update">
                <span className="invisible">X</span>
                {searchResults.map((user) => {
                  return (
                    <div key={user.id} className="flex gap-2">
                      <p className="hover:cursor-pointer">
                        <BsFillPencilFill onClick={() => updateHandler(user)} />
                      </p>
                      <p className="hover:cursor-pointer">
                        <BsFillTrash3Fill onClick={() => deleteUser(user)} />
                      </p>
                    </div>
                  );
                })}
              </div>
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
        </>
      ) : (
        <>
          {addModal && (
            <div className="modal fixed w-[100vw] h-[100%] top-0">
              <AddUserModal addModal={addModal} setAddModal={setAddModal} />
            </div>
          )}
          {updateModal && (
            <div className="modal fixed w-[100vw] h-[100%] top-0">
              <UpdateUserModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                theUser={theUser}
                setTheUser={setTheUser}
              />
            </div>
          )}
          <div className="flex items-center justify-between gap-2 flex-col md:flex-row border-b p-2">
            <div className="relative">
              <form onSubmit={searchHandler}>
                <input
                  type="text"
                  placeholder="Search a user"
                  className="search-input"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button>
                  <PiMagnifyingGlass className="absolute right-2 top-3 text-black" />
                </button>
              </form>
            </div>
            <div>
              <span className="hover:cursor-default"> Add User</span>
              <button
                className="add-button max-w-20 ml-4"
                onClick={() => setAddModal(true)}
              >
                +
              </button>
            </div>
          </div>
          <div className="px-2">
            <div className="users flex justify-between mt-4">
              <div className="user-props picture">
                <span className="all-titles">PICTURE</span>
                {users.data.map((user) => {
                  return (
                    user?.picture && (
                      <Image
                        className="image"
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
                  return (
                    <p key={user.id} className="capitalize">
                      {user.title}
                    </p>
                  );
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
              <div className="delete update">
                <span className="invisible">X</span>
                {users.data.map((user) => {
                  return (
                    <div key={user.id} className="flex gap-2">
                      <p className="hover:cursor-pointer">
                        <BsFillPencilFill onClick={() => updateHandler(user)} />
                      </p>
                      <p className="hover:cursor-pointer">
                        <BsFillTrash3Fill onClick={() => deleteUser(user)} />
                      </p>
                    </div>
                  );
                })}
              </div>
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
        </>
      )}
      {/* All Users */}
      {/* {!isLoading && (
        <>
          {addModal && (
            <div className="modal fixed w-[100vw] h-[100%] top-0">
              <AddUserModal addModal={addModal} setAddModal={setAddModal} />
            </div>
          )}
          {updateModal && (
            <div className="modal fixed w-[100vw] h-[100%] top-0">
              <UpdateUserModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                theUser={theUser}
                setTheUser={setTheUser}
              />
            </div>
          )}
          <div className="flex items-center justify-between gap-2 flex-col md:flex-row border-b p-2">
            <div className="relative">
              <PiMagnifyingGlass className="absolute right-2 top-3 text-black" />
              <input
                type="text"
                placeholder="Search a user"
                className="search-input"
              />
            </div>
            <div>
              <span className="hover:cursor-default"> Add User</span>
              <button
                className="add-button max-w-20 ml-4"
                onClick={() => setAddModal(true)}
              >
                +
              </button>
            </div>
          </div>
          <div className="px-2">
            <div className="users flex justify-between mt-4">
              <div className="user-props picture">
                <span className="all-titles">PICTURE</span>
                {users.data.map((user) => {
                  return (
                    user?.picture && (
                      <Image
                        className="image"
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
                  return (
                    <p key={user.id} className="capitalize">
                      {user.title}
                    </p>
                  );
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
              <div className="delete update">
                <span className="invisible">X</span>
                {users.data.map((user) => {
                  return (
                    <div key={user.id} className="flex gap-2">
                      <p className="hover:cursor-pointer">
                        <BsFillPencilFill onClick={() => updateHandler(user)} />
                      </p>
                      <p className="hover:cursor-pointer">
                        <BsFillTrash3Fill onClick={() => deleteUser(user)} />
                      </p>
                    </div>
                  );
                })}
              </div>
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
        </>
      )} */}
    </div>
  );
};

export default Users;
