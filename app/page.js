import Post from "./post/page";
import Users from "./users/page";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center bg-yellow-500 h-[120px] text-[#e7ebe2]">
        <h1 className="text-3xl font-bold">Users and Posts</h1>
      </div>
      <div>
        <div className="p-2">
          <Users />
        </div>
        <div className="border-2">
          <Post />
        </div>
      </div>
    </>
  );
}
