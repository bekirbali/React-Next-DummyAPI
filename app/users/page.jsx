"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { toastWarnNotify } from "../utils/Toastify";
import UsersSearchResults from "../components/user/UsersSearchResults";
import UsersDataList from "../components/user/UsersDataList";

const Users = () => {
  const {
    deleteUser,
    getUserData,
    users,
    page,
    setPage,
    totalUserCount,
    searchText,
    setSearchText,
    searchResults,
    setSearchResults,
    getUserById,
    idUser,
    setIdUser,
  } = useContext(UserContext);

  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [userByIdModal, setUserByIdModal] = useState(false);
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
    setSearchResults([]);
    setSearchText("");
    setNoResult("");
  };

  const getUserByIdHandler = (user) => {
    getUserById(user);
    setUserByIdModal(true);
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
  }, [page]);

  return (
    <>
      {noResult ? (
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
        <UsersSearchResults
          addModal={addModal}
          setAddModal={setAddModal}
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          userByIdModal={userByIdModal}
          setUserByIdModal={setUserByIdModal}
          theUser={theUser}
          setTheUser={setTheUser}
          idUser={idUser}
          setIdUser={setIdUser}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          updateHandler={updateHandler}
          getUserByIdHandler={getUserByIdHandler}
          searchHandler={searchHandler}
          searchText={searchText}
          setSearchText={setSearchText}
          setNoResult={setNoResult}
          deleteUser={deleteUser}
        />
      ) : (
        <UsersDataList
          addModal={addModal}
          setAddModal={setAddModal}
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          userByIdModal={userByIdModal}
          setUserByIdModal={setUserByIdModal}
          theUser={theUser}
          setTheUser={setTheUser}
          idUser={idUser}
          setIdUser={setIdUser}
          updateHandler={updateHandler}
          getUserByIdHandler={getUserByIdHandler}
          searchHandler={searchHandler}
          searchText={searchText}
          setSearchText={setSearchText}
          page={page}
          setPage={setPage}
          nextPage={nextPage}
          previousPage={previousPage}
          getUserData={getUserData}
          deleteUser={deleteUser}
        />
      )}
    </>
  );
};

export default Users;
