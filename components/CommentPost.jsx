/* eslint-disable @next/next/no-img-element */
"use client";
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
import { db, storage } from "@/firebase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";

import { RecoilRoot, useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";

import CommentModal from "./CommentModal";

import { useRouter } from "next/navigation";

const CommentPost = ({ post, id }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, post]);

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, post]);
  // console.log(id);

  useEffect(() => {
    setHasLiked(
      likes?.findIndex((like) => like?.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (!post || !id || !session?.user?.uid) {
        return;
      }

      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
          username: session?.user?.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
      if (post?.image) {
        await deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  }
  console.log(post);

  return (
    <div className="flex cursor-pointer border-b border-gray-200">
      {/* user image  */}
      <img
        src={post?.userImg}
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
              {post?.name}
            </h4>
            <span className="text-sm sm:text-[15px] ">@{post?.username}</span>
            <span className="text-sm sm:text-[15px] hover:underline ">
              {moment(post?.timestamp?.toDate())?.fromNow()}
            </span>
          </div>
          {/* dot icon */}
          <EllipsisHorizontalIcon className="h-12 w-12 p-2 font-bold hover:bg-sky-100 hover:text-sky-500 hoverEffect" />
        </div>
        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2 ">
          {post?.text}
        </p>
        {/* post img */}
        {post?.image && (
          <img
            src={post?.image}
            alt="postimage"
            className="w-full h-96 rounded-2xl mr-2"
          />
        )}
        {/* icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <div className=" flex items-center select-none">
            <button
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
            >
              <ChatBubbleLeftEllipsisIcon className="h-9 hover:text-sky-500 hover:bg-sky-100 w-9 hoverEffect p-2" />
            </button>

            {comments?.length > 0 && (
              <span className="text-sm">{comments.length} </span>
            )}
          </div>
          {open && <CommentModal />}
          {session?.user?.uid === post?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 hover:text-red-600 hover:bg-red-100 w-9 hoverEffect p-2"
            />
          )}
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
  i;
};

export default CommentPost;
