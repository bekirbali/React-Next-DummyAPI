import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../context/UserContext";

const AddUserModal = ({ setAddModal }) => {
  const {
    addUser,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    title,
    setTitle,
    picture,
    setPicture,
  } = useContext(UserContext);

  const submitHandler = (e) => {
    e.preventDefault();
    addUser();
    setAddModal(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPicture("");
    setTitle("");
  };

  const closeModal = () => {
    setAddModal(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPicture("");
    setTitle("");
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form">
        <div className="form_front relative">
          <button
            onClick={closeModal}
            className="modal-close absolute z-50 top-2 right-2 text-[#ffe23d] hover:text-white"
          >
            <IoClose size={32} />
          </button>
          <div className="form_details">Create User</div>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            required
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            required
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input !normal-case"
            placeholder="Email"
            value={email}
            required
          />
          <input
            onChange={(e) => setPicture(e.target.value)}
            type="url"
            className="input"
            placeholder="Picture Link"
            value={picture}
            required
          />
          <select
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            className="input"
            defaultValue={title}
            required
          >
            <option value={title} disabled hidden>
              Choose Title
            </option>
            <option value="mr">Mr</option>
            <option value="ms">Ms</option>
            <option value="mrs">Mrs</option>
            <option value="miss">Miss</option>
          </select>
          <button className="btn">Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;
