import { PostContext } from "@/app/context/PostContext";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";

const AddPostModal = ({ setAddModal }) => {
  const { setThePost, addPost } = useContext(PostContext);

  const submitHandler = (e) => {
    e.preventDefault();
    addPost();
    setAddModal(false);
    // setThePost({
    //   text: "",
    //   tags: [],
    //   image: "",
    //   id: "",
    // })
  };

  const closeModal = () => {
    setAddModal(false);
    // setThePost({
    //   text: "",
    //   tags: [],
    //   image: "",
    //   id: "",
    // })
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form">
        <div className="form_front relative">
          <span
            onClick={() => closeModal(false)}
            className="modal-close hover:cursor-pointer absolute z-50 top-2 right-2 text-[#ffe23d] hover:text-white"
          >
            <IoClose size={32} />
          </span>
          <div className="form_details">Create Post</div>
          <input
            onChange={(e) =>
              setThePost((oldInfos) => {
                return { ...oldInfos, image: e.target.value };
              })
            }
            type="text"
            className="input !normal-case"
            placeholder="Picture"
            required
          />
          <input
            onChange={(e) =>
              setThePost((oldInfos) => {
                return { ...oldInfos, text: e.target.value };
              })
            }
            type="text"
            className="input !normal-case"
            placeholder="Text"
            required
          />
          <input
            onChange={(e) =>
              setThePost((oldInfos) => {
                return { ...oldInfos, tags: e.target.value.trim().split(",") };
              })
            }
            type="text"
            className="input !normal-case"
            placeholder="Tags"
            required
          />
          <button className="btn">Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddPostModal;
