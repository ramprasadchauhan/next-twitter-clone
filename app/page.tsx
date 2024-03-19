/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Feed from "../components/Feed.jsx";
import Widgets from "../components/Widgets.jsx";
import CommentModal from "../components/CommentModal.jsx";
import { getData } from "./api.js";

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
      {/* Modal  */}
      <CommentModal />
    </div>
  );
};

export default page;
