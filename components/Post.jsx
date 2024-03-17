/* eslint-disable @next/next/no-img-element */

import moment from "moment";
import {
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Post = ({ post }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (!post || !post.id || !session?.user?.uid) {
        return;
      }

      if (hasLiked) {
        await deleteDoc(
          doc(db, "posts", post?.id, "likes", session?.user?.uid)
        );
      } else {
        await setDoc(doc(db, "posts", post?.id, "likes", session?.user?.uid), {
          username: session?.user?.username,
        });
      }
    } else {
      signIn();
    }
  }

  return (
    <div className="flex cursor-pointer border-b border-gray-200">
      {/* user image  */}
      <img
        src={post?.data()?.userImg}
        alt="user-image"
        className="h-10 w-10 mr-4 rounded-full cursor-pointer hover:brightness-75"
      />
      {/* right  */}
      <div className="w-full">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px] ">
              @{post?.data()?.username}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline ">
              {moment(post?.data()?.timestamp?.toDate())?.fromNow()}
            </span>
          </div>
          {/* dot icon */}
          <EllipsisHorizontalIcon className="h-12 w-12 p-2 font-bold hover:bg-sky-100 hover:text-sky-500 hoverEffect" />
        </div>
        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {post?.data()?.text}
        </p>
        {/* post img */}
        {post?.data()?.image && (
          <img
            src={post?.data()?.image}
            alt="postimage"
            className="w-full h-96 rounded-2xl mr-2"
          />
        )}
        {/* icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <ChatBubbleLeftEllipsisIcon className="h-9 hover:text-sky-500 hover:bg-sky-100 w-9 hoverEffect p-2" />
          <TrashIcon className="h-9 hover:text-red-600 hover:bg-red-100 w-9 hoverEffect p-2" />
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes?.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"} text-sm select-none`}
              >
                {likes?.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 hover:text-sky-500 hover:bg-sky-100 w-9 hoverEffect p-2" />
          <ChartBarIcon className="h-9 hover:text-sky-500 hover:bg-sky-100 w-9 hoverEffect p-2" />
        </div>
      </div>
    </div>
  );
};

export default Post;
