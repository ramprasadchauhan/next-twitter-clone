import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Feed from "./components/Feed.jsx";
const page = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
    </div>
  );
};

export default page;
