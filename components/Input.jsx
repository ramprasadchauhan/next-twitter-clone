/* eslint-disable @next/next/no-img-element */
"use client";

import {
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const filePickerRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      // console.log(readerEvent.target.result);
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {session && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <img
            onClick={signOut}
            src={session?.user?.image}
            alt="image"
            className="h-10 w-10 rounded-full cursor-pointer hover:brightness-75"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="border-none w-full focus:ring-0 text-lg placeholder-gray-700 text-gray-700 tracking-wide min-h-[50px] "
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XMarkIcon
                  onClick={() => setSelectedFile(null)}
                  className="h-7 text-black hover:text-red-700 border rounded-full shadow-md shadow-white transition ease-in-out border-red-600 hover:bg-yellow-400 absolute cursor-pointer"
                />
                <img
                  className={`${loading && "animate-pulse"}`}
                  src={selectedFile}
                  alt="file"
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex gap-1">
                    <div onClick={() => filePickerRef.current.click()}>
                      <PhotoIcon className="h-10 text-sky-500 hovetEffect w-10 bg-sky-100 rounded-full" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <FaceSmileIcon className="h-10 text-sky-500 hovetEffect w-10 bg-sky-100 rounded-full" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InputWithSession = () => (
  <SessionProvider>
    <Input />
  </SessionProvider>
);

export default InputWithSession;
