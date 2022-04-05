import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { editUserState } from "./atoms";
import { useRecoilState } from "recoil";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

function Markdown() {
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const detail = editUser.detail;

  const handelDetail = (e) => {
    setEditUser({...editUser, detail: e})
  }

  return (
    <div className="mt-4">
      <MDEditor value={detail} onChange={handelDetail} />
    </div>
  );
}

export default Markdown;
