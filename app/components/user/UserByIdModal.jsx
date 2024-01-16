import { PostContext } from "@/app/context/PostContext";
import React, { useContext, useEffect } from "react";

const UserByIdModal = ({ idUser, setUserByIdModal }) => {
  return (
    <div className="id-user-modal w-1/2 mx-auto hover:cursor-default">
      <div className="container-id bg-[#f6f7cbad] p-2 text-black font-semibold">
        <p className="border-b">
          First Name: <span className="font-normal">{idUser.firstName}</span>
        </p>
        <p className="border-b">
          Last Name:<span className="font-normal"> {idUser.lastName}</span>
        </p>
        <p className="border-b">
          Email: <span className="font-normal">{idUser.email}</span>
        </p>
        <p className="border-b">
          Gender: <span className="font-normal">{idUser.gender}</span>
        </p>
        <p className="border-b">
          Title: <span className="font-normal">{idUser.title}</span>
        </p>
        <p className="border-b">
          Date of Birth:{" "}
          <span className="font-normal">
            {new Date(idUser.dateOfBirth).toLocaleDateString()}
          </span>
        </p>
        <p className="border-b">
          Location:{" "}
          <span className="font-normal">
            {" "}
            {`${idUser.location?.street} street, ${idUser.location?.state},${idUser.location?.city},${idUser.location?.country}`}
          </span>
        </p>
        <p className="border-b">
          Phone:<span className="font-normal"> {idUser.phone}</span>
        </p>

        <button onClick={() => setUserByIdModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default UserByIdModal;
