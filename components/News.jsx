/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";

const News = ({ article }) => {
  //   console.log(article);
  return (
    <a rel="noreferrer" href={article.url} target="_blank">
      <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition ease-out duration-500">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold">{article.title} </h6>
          <p className="text-sm font-medium text-gray-500">
            {article.source.name}
          </p>
        </div>
        <img
          src={article.urlToImage}
          alt="image"
          className="rounded-xl"
          width={70}
        />
      </div>
    </a>
  );
};

export default News;
