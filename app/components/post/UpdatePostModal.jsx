import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { PostContext } from "../../context/PostContext";

const UpdatePostModal = () => {
  const { setUpdateModal, thePost, setThePost, updatePost } =
    useContext(PostContext);

  const submitHandler = (e) => {
    e.preventDefault();
    setUpdateModal(false);
    updatePost(thePost);
  };

  const { text, image, tags } = thePost;

  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form">
        <div className="form_front relative">
          <span
            onClick={() => setUpdateModal(false)}
            className="modal-close hover:cursor-pointer absolute z-50 top-2 right-2 text-[#ffe23d] hover:text-white"
          >
            <IoClose size={32} />
          </span>
          <div className="form_details">Update Post</div>
          <input
            onChange={(e) =>
              setThePost((oldInfos) => {
                return { ...oldInfos, text: e.target.value };
              })
            }
            type="text"
            className="input !normal-case"
            placeholder="Text"
            value={text}
            required
          />
          <input
            onChange={(e) =>
              setThePost((oldInfos) => {
                return { ...oldInfos, image: e.target.value };
              })
            }
            type="text"
            className="input !normal-case"
            placeholder="Picture"
            value={image}
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
            value={tags}
            required
          />
          <button className="btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostModal;
