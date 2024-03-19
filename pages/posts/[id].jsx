/* eslint-disable @next/next/no-img-element */
"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import CommentModal from "../../components/CommentModal";

import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { RecoilRoot, useRecoilState } from "recoil";

import CommentPost from "../../components/CommentPost";
import AllPostComment from "../../components/AllPostComment";

const PostPage = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!id || !db) return;
    const unsubscribe = onSnapshot(doc(db, "posts", id), (snapshot) =>
      setPost(snapshot.data())
    );

    // Cleanup function
    return () => unsubscribe();
  }, [db, id]);

  useEffect(() => {
    if (!id || !db) return;
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db, id]);
  console.log(comments);

  return (
    <RecoilRoot>
      <div>
        <Head>
          <title>Post Page</title>
          <meta name="description" content="Twitter clone by next app" />
        </Head>
        <main className="flex min-h-screen mx-auto">
          <Sidebar />

          {/* Feed  */}

          <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px]">
            <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
              <div onClick={() => router.push("/")} className="hoverEffect">
                <ArrowLeftIcon className="h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
                Tweet
              </h2>
            </div>

            {/* <Post id={id} post={post} /> */}
            <CommentPost id={id} post={post} />
            <AllPostComment />
          </div>

          {/* Widgets */}
          {data && (
            <Widgets
              newsResults={data.newsResults}
              randomUserResults={data.randomUserResults.results}
            />
          )}

          {/* Modal */}

          <CommentModal />
        </main>
      </div>
    </RecoilRoot>
  );
};

export default PostPage;

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
