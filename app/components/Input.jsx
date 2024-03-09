import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

const Input = () => {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <Image
        src="https://media.licdn.com/dms/image/D5603AQEbI4K4FjhQ9A/profile-displayphoto-shrink_800_800/0/1707203530522?e=1715212800&v=beta&t=piD66hgwL01Q8fyOC2TUMJZGG-1kLTv86dkMLg2PQIY"
        alt="image"
        width="50"
        height="50"
        priority
        className="h-10 w-10 rounded-full cursor-pointer hover:brightness-75"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="border-none w-full focus:ring-0 text-lg placeholder-gray-700 text-gray-700 tracking-wide min-h-[50px] "
            rows="2"
            placeholder="What's happening?"
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex gap-1">
            <PhotoIcon className="h-10 text-sky-500 hovetEffect w-10 bg-sky-100" />
            <FaceSmileIcon className="h-10 text-sky-500 hovetEffect w-10 bg-sky-100" />
          </div>
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
