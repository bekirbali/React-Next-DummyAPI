import React from "react";

const AddUserModal = ({ addModal, setAddModal }) => {
  return (
    <div
      className={`absolute ${
        addModal ? "flex" : "hidden"
      } w-[100vw] min-h-[100vh] bg-[#1b1b1abd] left-0 top-0`}
    >
      <div className="absolute flex items-center justify-center w-[70%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20">
        <button
          onClick={() => setAddModal(false)}
          className="button-close-modal z-50"
        >
          <span className="x-modal"></span>
          <span className="y-modal"></span>
          <div className="close-modal">Close</div>
        </button>
      </div>
    </div>
  );
};

export default AddUserModal;
