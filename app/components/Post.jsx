import { ChatBubbleLeftIcon } from "@heroicons/react/16/solid";
import {
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const Post = ({ post }) => {
  return (
    <div className="flex cursor-pointer border-b border-gray-200">
      {/* user image  */}
      <Image
        src={post.userImg}
        alt="user-image"
        width="50"
        height="50"
        priority
        className="h-10 w-10 mr-4 rounded-full cursor-pointer hover:brightness-75"
      />
      {/* right  */}

      <div className="w-full">
        {/* heaader  */}
        <div className="flex items-center justify-between">
          {/* post user info  */}
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px] ">@{post.username} </span>
            <span className="text-sm sm:text-[15px] hover:underline ">
              {post.timestamp}
            </span>
          </div>
          {/* dot icon  */}
          <EllipsisHorizontalIcon className="h-12 w-12 p-2 font-bold hover:bg-sky-100 hover:text-sky-500 hoverEffect" />
        </div>
        {/* post text  */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {post.text}{" "}
        </p>

        {/* post img  */}
        <Image
          src={post.img}
          alt="postimage"
          height={50}
          width={100}
          priority
          quality={100}
          className="w-full h-96 rounded-2xl mr-2"
        />

        {/* icons  */}
        <div className="flex justify-between text-gray-500 p-2">
          <ChatBubbleLeftEllipsisIcon className="h-9 hover:text-sky-500 hover:bg-sky-100 w-9 hoverEffect p-2" />
          <TrashIcon className="h-9 hover:text-red-600 hover:bg-red-100 w-9 hoverEffect p-2" />
          <HeartIcon className="h-9 hover:text-red-600 hover:bg-red-100 w-9 hoverEffect p-2" />
          <ShareIcon className="h-9 hover:text-sky-500 hover:bg-sky-100 w-9 hoverEffect p-2" />
          <ChartBarIcon className="h-9 hover:text-sky-500 hover:bg-sky-100 w-9 hoverEffect p-2" />
        </div>
      </div>
    </div>
  );
};

export default Post;
