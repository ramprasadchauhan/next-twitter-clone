/* eslint-disable @next/next/no-img-element */
"use client";
import { modalState, postIdState } from "@/atom/modalAtom";
import { db } from "@/firebase";
import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { doc, onSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { SessionProvider, useSession } from "next-auth/react";

import { useRecoilState } from "recoil";
import { PhotoIcon } from "@heroicons/react/24/solid";

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId]);
  console.log(post);

  function sendComment() {}
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg  w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-1 border-gray-200 rounded-xl shadow-md "
        >
          <div className="p-1">
            <div className="border-b border-gray-200 font-semibold py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <XMarkIcon className="h-[26px] text-red-500 " />
              </div>
              <div className="flex items-center space-x-1 relative">
                <span className="w-0.5 h-full z-[-1] absolute top-11 left-6 bg-gray-300" />
                <img
                  src={
                    post?._document?.data?.value?.mapValue?.fields?.userImg
                      ?.stringValue
                  }
                  alt="user-image"
                  className="h-10 w-10 mr-4 rounded-full cursor-pointer hover:brightness-75"
                />
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">
                  {
                    post?._document?.data?.value?.mapValue?.fields?.name
                      ?.stringValue
                  }
                </h4>
                <span className="text-sm sm:text-[15px] ">
                  @
                  {
                    post?._document?.data?.value?.mapValue?.fields?.username
                      ?.stringValue
                  }
                </span>
                <span className="text-sm sm:text-[15px] hover:underline ">
                  {moment(
                    post?._document?.createTime?.timestamp?.toDate()
                  )?.fromNow()}
                </span>
              </div>
              <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2 ">
                {post?.data()?.text}
              </p>

              <div className="flex  p-3 space-x-3">
                <img
                  src={session?.user?.image}
                  alt="image"
                  className="h-10 w-10 rounded-full cursor-pointer hover:brightness-75"
                />
                <div className="w-full divide-y divide-gray-200">
                  <div className="">
                    <textarea
                      className="border-none w-full focus:ring-0 text-md placeholder-gray-500 text-gray-700 tracking-wide min-h-[50px] "
                      rows="2"
                      placeholder="Tweet your reply"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between pt-2.5">
                    <>
                      <div className="flex gap-1">
                        <div
                        //  onClick={() => filePickerRef.current.click()}
                        >
                          <PhotoIcon className="h-10 text-sky-500 hovetEffect w-10 bg-sky-100 rounded-full" />
                          {/* <input
                            type="file"
                            hidden
                            ref={filePickerRef}
                            onChange={addImageToPost}
                          /> */}
                        </div>
                        <FaceSmileIcon className="h-10 text-sky-500 hovetEffect w-10 bg-sky-100 rounded-full" />
                      </div>
                      <button
                        onClick={sendComment}
                        disabled={!input.trim()}
                        className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                      >
                        Reply
                      </button>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const CommentModalWithSession = () => (
  <SessionProvider>
    <CommentModal />
  </SessionProvider>
);

export default CommentModalWithSession;
