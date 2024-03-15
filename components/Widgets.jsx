"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import News from "./News";
import { useState } from "react";

const Widgets = ({ newsResults, randomUserResults }) => {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNumber, setRandomUserNumber] = useState(3);
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5 ">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50 ">
        <div className="flex items-center p-3 rounded-full bg-red-200 relative">
          <MagnifyingGlassIcon className="h-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[80%] ">
        <h4 className="font-bold text-xl px-4">What&apos;s happinngs</h4>
        {newsResults.articles.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[80%] sticky top-16  ">
        <h4 className="font-bold text-xl px-4">Who to follow </h4>
        {randomUserResults.slice(0, randomUserNumber).map((randomUser) => (
          <div
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-full ml-2 leading-5"
            key={randomUser.login.username}
          >
            <img
              src={randomUser.picture.thumbnail}
              width={40}
              alt="randomeuser"
              className="rounded-full mr-6"
            />
            <div className="max-w-40 truncate">
              <h4 className="font-bold hover:underline text-[14px] truncate">
                {randomUser.login.username}
              </h4>
              <h5 className="text-[13px] text-gray-500 truncate ">
                {randomUser?.name?.first + " " + randomUser?.name?.last}
              </h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
              Follow
            </button>
          </div>
        ))}
        <button
          onClick={() => setRandomUserNumber(randomUserNumber + 3)}
          className="text-blue-400 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
