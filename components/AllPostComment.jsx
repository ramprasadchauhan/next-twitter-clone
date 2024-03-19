/* eslint-disable @next/next/no-img-element */
"use client";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useRouter } from "next/router";
import moment from "moment";

const AllPostComment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (!id || !db) return;
    const unsubcribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
    return () => unsubcribe();
  }, [db, id]);

  return (
    <div className="flex justify-center">
      {comments.length > 0 && (
        <div>
          {comments.map((comment) => {
            return (
              <div key={comment.id} id={comment.id}>
                <div className="flex flex-col gap-2 ">
                  <div className="flex items-center space-x-1 relative">
                    <img
                      src={
                        comment?._document?.data?.value?.mapValue?.fields
                          ?.userImg?.stringValue
                      }
                      alt="user-image"
                      className="h-10 w-10 mr-4 rounded-full cursor-pointer hover:brightness-75"
                    />
                    <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline ">
                      {
                        comment?._document?.data?.value?.mapValue?.fields?.name
                          ?.stringValue
                      }
                    </h4>
                    <span className="text-sm sm:text-[15px] ">
                      @
                      {
                        comment?._document?.data?.value?.mapValue?.fields
                          ?.username?.stringValue
                      }
                    </span>
                    <span className="text-sm sm:text-[15px] hover:underline ">
                      {moment(
                        comment?._document?.createTime?.timestamp?.toDate()
                      )?.fromNow()}
                    </span>
                  </div>
                  <div className=" ml-10 w-full font-medium">
                    {
                      comment?._document?.data?.value?.mapValue.fields?.comment
                        .stringValue
                    }
                    {/* <span className="w-full text-gray-200 h-0.5 border border-gray-100" /> */}
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllPostComment;
