import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

function Markdown() {
  const [detail, setDetail] = useState("**Hello world!!!**");

  return (
    <div className="mt-4">
      <MDEditor value={detail} onChange={setDetail} />
    </div>
  );
}

export default Markdown;
