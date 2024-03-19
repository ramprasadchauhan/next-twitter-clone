// /* eslint-disable react-hooks/rules-of-hooks */
"use client";
// import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Feed from "../components/Feed.jsx";
import Widgets from "../components/Widgets.jsx";
import CommentModal from "../components/CommentModal.jsx";
// import { getData } from "./api.js";

// const page = async () => {
//    const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // const data = await getData();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedData = await getData();
//         setData(fetchedData);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // console.log(data);
//   return (
//     <div className="flex min-h-screen mx-auto">
//       {/* Sidebar */}
//       <Sidebar />
//       {/* Feed */}

//       <Feed />

//       {/* Widges  */}
//       <Widgets
//         newsResults={data.newsResults}
//         randomUserResults={data.randomUserResults.results}
//       />
//       {/* Modal  */}
//       <CommentModal />
//     </div>
//   );
// };

// export default page;

import React, { useState, useEffect } from "react";
import { getData } from "./api"; // Assuming api.js is in the same directory

interface Data {
  newsResults: any;
  randomUserResults: any;
}

const Page: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: Data = await getData();
        setData(fetchedData);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading and error states appropriately
  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Access data safely after checks
  const { newsResults, randomUserResults } = data || {}; // Use nullish coalescing for safety

  return (
    <div className="flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed newsResults={newsResults} />
      {/* Widgets */}
      <Widgets randomUserResults={randomUserResults?.results} />{" "}
      {/* Access results safely */}
      {/* Modal */}
      <CommentModal />
    </div>
  );
};

export default Page;
