import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Feed from "./components/Feed.jsx";
import Widgets from "./components/Widgets.jsx";
const page = async () => {
  const data = await getData();
  return (
    <div className="flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* Widges  */}
      <Widgets newsResults={data.articles} />
    </div>
  );
};

export default page;

// https://saurav.tech/NewsAPI/top-headlines/category/business/in.json

export async function getData() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
  );
  if (!newsResults.ok) {
    throw new Error("Failed to fetch data");
  }
  return newsResults.json();
}
