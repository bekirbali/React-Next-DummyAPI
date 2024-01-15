import Post from "./post/page";
import Users from "./users/page";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center bg-yellow-500 h-[120px] text-[#e7ebe2]">
        <h1 className="text-3xl font-bold cursor-default">Users and Posts</h1>
      </div>
      <div>
        <div>
          <Users />
        </div>
        <div>
          <Post />
        </div>
      </div>
    </>
  );
}
