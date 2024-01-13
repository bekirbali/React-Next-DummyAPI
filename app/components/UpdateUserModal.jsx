import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../context/UserContext";

const UpdateUserModal = ({ setUpdateModal, theUser, setTheUser }) => {
  const { updateUser } = useContext(UserContext);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser(theUser);
    setUpdateModal(false);
  };

  const { firstName, lastName, title, picture } = theUser;

  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form">
        <div className="form_front relative">
          <button
            onClick={() => setUpdateModal(false)}
            className="modal-close absolute z-50 top-2 right-2 text-[#ffe23d] hover:text-white"
          >
            <IoClose size={32} />
          </button>
          <div className="form_details">Update User</div>
          <input
            onChange={(e) =>
              setTheUser((oldInfos) => {
                return { ...oldInfos, firstName: e.target.value };
              })
            }
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            required
          />
          <input
            onChange={(e) =>
              setTheUser((oldInfos) => {
                return { ...oldInfos, lastName: e.target.value };
              })
            }
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            required
          />
          <input
            onChange={(e) =>
              setTheUser((oldInfos) => {
                return { ...oldInfos, picture: e.target.value };
              })
            }
            type="url"
            className="input"
            placeholder="Picture Link"
            value={picture}
            required
          />
          <select
            onChange={(e) =>
              setTheUser((oldInfos) => {
                return { ...oldInfos, title: e.target.value };
              })
            }
            name="title"
            id="title"
            className="input"
            defaultValue={title}
            required
          >
            <option value="mr">Mr</option>
            <option value="ms">Ms</option>
            <option value="mrs">Mrs</option>
            <option value="miss">Miss</option>
          </select>
          <button className="btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserModal;
