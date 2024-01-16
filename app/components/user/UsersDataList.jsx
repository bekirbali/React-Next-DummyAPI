import React, { useContext, useEffect } from "react";
import Image from "next/image";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillPencilFill,
  BsFillTrash3Fill,
} from "react-icons/bs";
import { MdInfoOutline } from "react-icons/md";
import { PiMagnifyingGlass } from "react-icons/pi";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";
import UserByIdModal from "./UserByIdModal";
import { UserContext } from "@/app/context/UserContext";

const UsersDataList = ({
  addModal,
  setAddModal,
  updateModal,
  setUpdateModal,
  userByIdModal,
  setUserByIdModal,
  theUser,
  setTheUser,
  idUser,
  updateHandler,
  getUserByIdHandler,
  searchHandler,
  searchText,
  setSearchText,
  deleteUser,
  nextPage,
  previousPage,
}) => {
  const { users } = useContext(UserContext);

  return (
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
      {userByIdModal && (
        <div className="modal fixed w-[100vw] h-[100%] top-0">
          <UserByIdModal setUserByIdModal={setUserByIdModal} idUser={idUser} />
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
            {users?.data?.map((user) => {
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
            {users?.data?.map((user) => {
              return (
                <p key={user.id} className="capitalize">
                  {user.title}
                </p>
              );
            })}
          </div>
          <div className="user-props first-name">
            <span className="all-titles">FIRST NAME</span>
            {users?.data?.map((user) => {
              return <p key={user.id}>{user.firstName}</p>;
            })}
          </div>
          <div className="user-props last-name">
            <span className="all-titles">LAST NAME</span>
            {users?.data?.map((user) => {
              return <p key={user.id}>{user.lastName}</p>;
            })}
          </div>
          <div className="user-props id">
            <span className="all-titles">ID</span>
            {users?.data?.map((user) => {
              return <p key={user.id}>{user.id}</p>;
            })}
          </div>
          <div className="delete update">
            <span className="invisible">X</span>
            {users?.data?.map((user) => {
              return (
                <div key={user.id} className="flex gap-2">
                  <p className="hover:cursor-pointer">
                    <MdInfoOutline
                      size={20}
                      onClick={() => getUserByIdHandler(user)}
                    />
                  </p>
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
  );
};

export default UsersDataList;
