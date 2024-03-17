import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Feed from "../components/Feed.jsx";
import Widgets from "../components/Widgets.jsx";

const page = async () => {
  const data = await getData();
  // console.log(data);
  return (
    <div className="flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}

      <Feed />

      {/* Widges  */}
      <Widgets
        newsResults={data.newsResults}
        randomUserResults={data.randomUserResults.results}
      />
    </div>
  );
};

export default page;

// https://saurav.tech/NewsAPI/top-headlines/category/business/in.json

export async function getData() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
  ).then((res) => res.json());

  const randomUserResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());
  return {
    newsResults,
    randomUserResults,
  };
}
