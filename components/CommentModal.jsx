"use client";

import { modalState } from "@/atom/modalAtom";
import { useRecoilState } from "recoil";

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  console.log(open);

  return (
    <div>
      <h1>Comment Modal</h1>
      {open && <h1>The modal is open</h1>}
    </div>
  );
};

export default CommentModal;
